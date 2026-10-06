const { app, BrowserWindow, Menu, ipcMain, shell, screen, Notification } = require('electron')
const path = require('path')
const fs = require('fs')

process.env.ELECTRON_ENABLE_SECURITY_WARNINGS = 'true'
app.enableSandbox()

let mainWindow, saveTimer
const isDev = process.env.CARECONNECT_DEV === '1'
const DEV_URL = 'http://127.0.0.1:5173'
const ALLOWED_EXTERNAL_URLS = new Set(['https://www.electronjs.org/docs/latest/'])

const statePath = () => path.join(app.getPath('userData'), 'window-state.json')
function loadState(){try{return {width:1440,height:960,isMaximized:false,...JSON.parse(fs.readFileSync(statePath(),'utf8'))}}catch{return {width:1440,height:960,isMaximized:false}}}
function visible(s){if(!Number.isFinite(s.x)||!Number.isFinite(s.y))return false;return screen.getAllDisplays().some(({workArea:a})=>s.x<a.x+a.width&&s.x+s.width>a.x&&s.y<a.y+a.height&&s.y+s.height>a.y)}
function saveState(){if(!mainWindow||mainWindow.isDestroyed())return;const b=mainWindow.getNormalBounds();fs.writeFileSync(statePath(),JSON.stringify({...b,isMaximized:mainWindow.isMaximized()},null,2))}
function queueSave(){clearTimeout(saveTimer);saveTimer=setTimeout(saveState,250)}
function nav(p){mainWindow?.webContents.send('navigation:go',p)}
function command(c){mainWindow?.webContents.send('app:command',c)}

function isTrustedSender(event){
  if(!mainWindow || event.sender !== mainWindow.webContents) return false
  const url=event.senderFrame?.url || ''
  if(isDev) return url.startsWith(`${DEV_URL}/`)
  return url.startsWith('file://')
}
function secureIpc(channel,handler){
  ipcMain.handle(channel,(event,...args)=>{
    if(!isTrustedSender(event)) throw new Error('Rejected IPC from untrusted renderer')
    return handler(...args)
  })
}
async function openTrustedExternal(url){
  if(!ALLOWED_EXTERNAL_URLS.has(url)) return
  await shell.openExternal(url)
}


function showCareNotification({ title, body } = {}) {
  if (!Notification.isSupported()) return { shown: false }
  const safeTitle = String(title || 'CareConnect').slice(0, 80)
  const safeBody = String(body || '').slice(0, 240)
  new Notification({ title: safeTitle, body: safeBody }).show()
  return { shown: true }
}

function createMenu(){Menu.setApplicationMenu(Menu.buildFromTemplate([
{label:'File',submenu:[{label:'Home',accelerator:'CommandOrControl+1',click:()=>nav('/patient/home')},{label:'Today',accelerator:'CommandOrControl+2',click:()=>nav('/patient/today')},{label:'Schedule',accelerator:'CommandOrControl+3',click:()=>nav('/patient/schedule')},{type:'separator'},{label:'Switch Role',accelerator:'CommandOrControl+Shift+L',click:()=>nav('/choose-role')},{type:'separator'},process.platform==='darwin'?{role:'close'}:{role:'quit'}]},
{label:'Edit',submenu:[{role:'undo'},{role:'redo'},{type:'separator'},{role:'cut'},{role:'copy'},{role:'paste'},{role:'delete'},{type:'separator'},{role:'selectAll'}]},
{label:'View',submenu:[{label:'Back',accelerator:'Alt+Left',click:()=>command('back')},{label:'Forward',accelerator:'Alt+Right',click:()=>command('forward')},{type:'separator'},{role:'reload'},{role:'forceReload'},{type:'separator'},{role:'resetZoom'},{role:'zoomIn'},{role:'zoomOut'},{type:'separator'},{role:'togglefullscreen',accelerator:'F11'},...(isDev?[{type:'separator'},{role:'toggleDevTools',accelerator:'F12'}]:[])]},
{label:'Help',submenu:[{label:'Keyboard Shortcuts',accelerator:'CommandOrControl+/',click:()=>command('shortcuts')},{label:'Electron Documentation',click:()=>openTrustedExternal('https://www.electronjs.org/docs/latest/')},{type:'separator'},{label:'About CareConnect',click:()=>command('about')}]}
]))}

function createWindow(){
 const s=loadState()
 const opts={width:s.width,height:s.height,minWidth:1050,minHeight:720,show:false,backgroundColor:'#f6f8fb',title:'CareConnect',
 webPreferences:{preload:path.join(__dirname,'preload.cjs'),contextIsolation:true,nodeIntegration:false,sandbox:true,webSecurity:true,allowRunningInsecureContent:false}}
 if(visible(s)){opts.x=s.x;opts.y=s.y}
 mainWindow=new BrowserWindow(opts)
 if(s.isMaximized)mainWindow.maximize()
 if(isDev)mainWindow.loadURL(DEV_URL)
 else mainWindow.loadFile(path.join(__dirname,'..','dist','index.html'))
 mainWindow.once('ready-to-show',()=>mainWindow.show())
 ;['resize','move','maximize','unmaximize'].forEach(e=>mainWindow.on(e,queueSave))
 mainWindow.on('close',saveState)

 // CareConnect is a local SPA. Prevent renderer navigation to arbitrary pages.
 mainWindow.webContents.on('will-navigate',(event,url)=>{
   const allowed=isDev ? url.startsWith(`${DEV_URL}/`) : url.startsWith('file://')
   if(!allowed) event.preventDefault()
 })
 mainWindow.webContents.setWindowOpenHandler(()=>({action:'deny'}))
}

secureIpc('app:getInfo',()=>({name:app.getName(),version:app.getVersion(),platform:process.platform}))
secureIpc('window:getState',()=>mainWindow?{maximized:mainWindow.isMaximized(),fullscreen:mainWindow.isFullScreen()}:null)
secureIpc('notification:show',showCareNotification)

app.whenReady().then(()=>{if(process.platform==='win32') app.setAppUserModelId('com.careconnect.desktop');createMenu();createWindow();app.on('activate',()=>{if(BrowserWindow.getAllWindows().length===0)createWindow()})})
app.on('window-all-closed',()=>{if(process.platform!=='darwin')app.quit()})
