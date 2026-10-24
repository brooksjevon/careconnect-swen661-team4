const { contextBridge, ipcRenderer } = require('electron')
contextBridge.exposeInMainWorld('careConnectDesktop',{
 getAppInfo:()=>ipcRenderer.invoke('app:getInfo'), getWindowState:()=>ipcRenderer.invoke('window:getState'),
 showNotification:(title,body)=>ipcRenderer.invoke('notification:show',{title,body}),
 onNavigate:(cb)=>{const fn=(_e,p)=>cb(p);ipcRenderer.on('navigation:go',fn);return()=>ipcRenderer.removeListener('navigation:go',fn)},
 onCommand:(cb)=>{const fn=(_e,c)=>cb(c);ipcRenderer.on('app:command',fn);return()=>ipcRenderer.removeListener('app:command',fn)}
})
