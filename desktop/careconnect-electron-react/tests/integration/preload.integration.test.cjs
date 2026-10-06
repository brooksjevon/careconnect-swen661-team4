const exposeInMainWorld = jest.fn()
const invoke = jest.fn()
const on = jest.fn()
const removeListener = jest.fn()

jest.mock('electron', () => ({
  contextBridge: { exposeInMainWorld },
  ipcRenderer: { invoke, on, removeListener },
}))

describe('Electron preload IPC integration', () => {
  let desktop

  beforeEach(() => {
    jest.resetModules()
    exposeInMainWorld.mockClear()
    invoke.mockReset()
    on.mockReset()
    removeListener.mockReset()

    require('../../electron/preload.cjs')
    expect(exposeInMainWorld).toHaveBeenCalledTimes(1)
    expect(exposeInMainWorld).toHaveBeenCalledWith('careConnectDesktop', expect.any(Object))
    desktop = exposeInMainWorld.mock.calls[0][1]
  })

  test('exposes the approved renderer API and invokes main-process IPC channels', async () => {
    invoke.mockResolvedValue({ ok: true })

    await desktop.getAppInfo()
    await desktop.getWindowState()
    await desktop.showNotification('Medication reminder', 'Amlodipine is due')

    expect(invoke).toHaveBeenNthCalledWith(1, 'app:getInfo')
    expect(invoke).toHaveBeenNthCalledWith(2, 'window:getState')
    expect(invoke).toHaveBeenNthCalledWith(3, 'notification:show', {
      title: 'Medication reminder',
      body: 'Amlodipine is due',
    })
  })

  test('forwards navigation and command events and returns cleanup functions', () => {
    const navigate = jest.fn()
    const command = jest.fn()

    const stopNavigate = desktop.onNavigate(navigate)
    const stopCommand = desktop.onCommand(command)

    const navigationListener = on.mock.calls.find(([channel]) => channel === 'navigation:go')[1]
    const commandListener = on.mock.calls.find(([channel]) => channel === 'app:command')[1]

    navigationListener({}, '/patient/today')
    commandListener({}, 'shortcuts')

    expect(navigate).toHaveBeenCalledWith('/patient/today')
    expect(command).toHaveBeenCalledWith('shortcuts')

    stopNavigate()
    stopCommand()

    expect(removeListener).toHaveBeenCalledWith('navigation:go', navigationListener)
    expect(removeListener).toHaveBeenCalledWith('app:command', commandListener)
  })
})
