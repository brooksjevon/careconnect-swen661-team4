const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1024,
    minHeight: 700,
    title: 'CareConnect Desktop',
    backgroundColor: '#f7f8fa',
    webPreferences: {
      preload: path.join(__dirname, 'electron-preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  mainWindow.loadFile('screens/landing.html');
}

function buildMenu() {
  const template = [
    {
      label: 'File',
      submenu: [
        { label: 'New Patient', accelerator: 'CmdOrCtrl+N' },
        { label: 'New Medication', accelerator: 'CmdOrCtrl+Shift+N' },
        { label: 'New Appointment', accelerator: 'CmdOrCtrl+Shift+A' },
        { type: 'separator' },
        { label: 'Save', accelerator: 'CmdOrCtrl+S' },
        { label: 'Print', accelerator: 'CmdOrCtrl+P' },
        { type: 'separator' },
        { label: 'Sign Out', accelerator: 'CmdOrCtrl+L', role: 'close' },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'selectAll' },
      ],
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' },
      ],
    },
    {
      label: 'Help',
      submenu: [
        { label: 'Keyboard Shortcuts', accelerator: 'CmdOrCtrl+Shift+K' },
        { label: 'About CareConnect' },
      ],
    },
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

app.whenReady().then(() => {
  buildMenu();
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});