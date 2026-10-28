const path = require('path')

const ipcHandlers = new Map()
const appEvents = new Map()
const webContentsEvents = new Map()
const windowEvents = new Map()
let openHandler
let createdWindow

const webContents = {
  send: jest.fn(),
  on: jest.fn((event, handler) => webContentsEvents.set(event, handler)),
  setWindowOpenHandler: jest.fn(handler => { openHandler = handler }),
}

class BrowserWindowMock {
  constructor(options) {
    this.options = options
    this.webContents = webContents
    this.loadURL = jest.fn()
    this.loadFile = jest.fn()
    this.show = jest.fn()
    this.maximize = jest.fn()
    this.once = jest.fn((event, handler) => {
      if (event === 'ready-to-show') handler()
    })
    this.on = jest.fn((event, handler) => windowEvents.set(event, handler))
    this.isDestroyed = jest.fn(() => false)
    this.getNormalBounds = jest.fn(() => ({ x: 10, y: 10, width: 1440, height: 960 }))
    this.isMaximized = jest.fn(() => false)
    this.isFullScreen = jest.fn(() => false)
    createdWindow = this
  }
  static getAllWindows() { return createdWindow ? [createdWindow] : [] }
}

const app = {
  enableSandbox: jest.fn(),
  getPath: jest.fn(() => path.join(process.cwd(), '.integration-test-user-data')),
  getName: jest.fn(() => 'CareConnect'),
  getVersion: jest.fn(() => '1.0.0'),
  whenReady: jest.fn(() => Promise.resolve()),
  on: jest.fn((event, handler) => appEvents.set(event, handler)),
  quit: jest.fn(),
  setAppUserModelId: jest.fn(),
}

const ipcMain = {
  handle: jest.fn((channel, handler) => ipcHandlers.set(channel, handler)),
}

const Menu = {
  buildFromTemplate: jest.fn(template => template),
  setApplicationMenu: jest.fn(),
}

const shell = { openExternal: jest.fn(() => Promise.resolve()) }
const screen = {
  getAllDisplays: jest.fn(() => [{ workArea: { x: 0, y: 0, width: 1920, height: 1080 } }]),
}

const notificationShow = jest.fn()
class NotificationMock {
  constructor(options) { this.options = options }
  show() { notificationShow(this.options) }
  static isSupported() { return true }
}

jest.mock('electron', () => ({
  app,
  BrowserWindow: BrowserWindowMock,
  Menu,
  ipcMain,
  shell,
  screen,
  Notification: NotificationMock,
}))

const flush = () => new Promise(resolve => setImmediate(resolve))

describe('Electron main-process integration', () => {
  beforeAll(async () => {
    delete process.env.CARECONNECT_DEV
    require('../../electron/main.cjs')
    await flush()
  })

  test('creates a secure production BrowserWindow and loads the built renderer', () => {
    expect(app.enableSandbox).toHaveBeenCalled()
    expect(createdWindow).toBeDefined()
    expect(createdWindow.options).toEqual(expect.objectContaining({
      minWidth: 1050,
      minHeight: 720,
      show: false,
      title: 'CareConnect',
    }))
    expect(createdWindow.options.webPreferences).toEqual(expect.objectContaining({
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      webSecurity: true,
      allowRunningInsecureContent: false,
    }))
    expect(createdWindow.options.webPreferences.preload).toBe(path.join(process.cwd(), 'electron', 'preload.cjs'))
    expect(createdWindow.loadFile).toHaveBeenCalledWith(path.join(process.cwd(), 'dist', 'index.html'))
    expect(createdWindow.show).toHaveBeenCalled()
  })

  test('denies new windows and blocks navigation away from the local application', () => {
    expect(openHandler()).toEqual({ action: 'deny' })

    const preventDefault = jest.fn()
    const navigateHandler = webContentsEvents.get('will-navigate')

    navigateHandler({ preventDefault }, 'https://example.com/')
    expect(preventDefault).toHaveBeenCalledTimes(1)

    preventDefault.mockClear()
    navigateHandler({ preventDefault }, 'file:///careconnect/index.html')
    expect(preventDefault).not.toHaveBeenCalled()
  })

  test('accepts trusted renderer IPC and rejects an untrusted sender', async () => {
    const getInfo = ipcHandlers.get('app:getInfo')
    const trustedEvent = {
      sender: webContents,
      senderFrame: { url: 'file:///careconnect/index.html' },
    }

    expect(getInfo(trustedEvent)).toEqual(expect.objectContaining({
      name: 'CareConnect',
      version: '1.0.0',
    }))

    expect(() => getInfo({
      sender: {},
      senderFrame: { url: 'https://malicious.example/' },
    })).toThrow('Rejected IPC from untrusted renderer')
  })

  test('handles renderer notification IPC through the main process', async () => {
    const showNotification = ipcHandlers.get('notification:show')
    const trustedEvent = {
      sender: webContents,
      senderFrame: { url: 'file:///careconnect/index.html' },
    }

    expect(showNotification(trustedEvent, {
      title: 'CareConnect reminder',
      body: 'Appointment at 3:30 pm',
    })).toEqual({ shown: true })

    expect(notificationShow).toHaveBeenCalledWith({
      title: 'CareConnect reminder',
      body: 'Appointment at 3:30 pm',
    })
  })
})
