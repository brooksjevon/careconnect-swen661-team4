import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const shortcuts=[
 ['Tab / Shift+Tab','Next / previous interactive element'],
 ['Arrow keys','Move spatially to the nearest control in that direction'],
 ['Enter / Space','Activate the focused control'],
 ['Home / End','First / last control in the current region'],
 ['Page Up / Page Down','Previous / next navigation region'],
 ['Alt+Left / Alt+Right','Back / forward through page history'],
 ['Ctrl+1 … Ctrl+7','Jump directly to application sections'],
 ['Ctrl+Shift+R','Switch Patient / Caregiver role'],
 ['Ctrl+/','Show this keyboard guide'],
 ['Escape','Close a dialog or return focus to the page']
]

const selector=[
 'a[href]','button:not([disabled])','input:not([disabled])','select:not([disabled])',
 'textarea:not([disabled])','[tabindex]:not([tabindex="-1"])','[role="button"]'
].join(',')

function visible(el){
 const r=el.getBoundingClientRect(),s=getComputedStyle(el)
 return r.width>0&&r.height>0&&s.visibility!=='hidden'&&s.display!=='none'
}
function editable(el){return el&&['INPUT','TEXTAREA','SELECT'].includes(el.tagName)}
function candidates(){
 return [...document.querySelectorAll(selector)].filter(visible)
}
function center(el){const r=el.getBoundingClientRect();return{x:r.left+r.width/2,y:r.top+r.height/2,r}}
function spatialMove(direction){
 const all=candidates()
 if(!all.length)return
 let current=document.activeElement
 if(!all.includes(current)){all[0].focus();all[0].scrollIntoView({block:'nearest'});return}
 const a=center(current)
 const possible=all.filter(el=>{
   if(el===current)return false
   const b=center(el)
   if(direction==='left')return b.x<a.x-4
   if(direction==='right')return b.x>a.x+4
   if(direction==='up')return b.y<a.y-4
   return b.y>a.y+4
 })
 if(!possible.length)return
 const scored=possible.map(el=>{
   const b=center(el),dx=b.x-a.x,dy=b.y-a.y
   const primary=(direction==='left'||direction==='right')?Math.abs(dx):Math.abs(dy)
   const cross=(direction==='left'||direction==='right')?Math.abs(dy):Math.abs(dx)
   // Strongly prefer aligned controls, then distance.
   return{el,score:primary+cross*2.4}
 }).sort((x,y)=>x.score-y.score)
 const next=scored[0].el
 next.focus({preventScroll:true})
 next.scrollIntoView({behavior:'smooth',block:'nearest',inline:'nearest'})
}
function regionMove(delta){
 const regions=[...document.querySelectorAll('[data-keyboard-region],nav,aside,main,form')].filter(visible)
 if(!regions.length)return
 const active=document.activeElement
 let i=regions.findIndex(r=>r.contains(active))
 i=i<0?(delta>0?-1:regions.length):(i+delta+regions.length)%regions.length
 const target=[...regions[i].querySelectorAll(selector)].find(visible)
 if(target){target.focus();target.scrollIntoView({block:'nearest'})}
}
function edgeMove(last=false){
 const all=candidates()
 if(!all.length)return
 const active=document.activeElement
 const region=active?.closest?.('[data-keyboard-region],nav,aside,main,form')
 const pool=region?[...region.querySelectorAll(selector)].filter(visible):all
 const target=last?pool[pool.length-1]:pool[0]
 target?.focus();target?.scrollIntoView({block:'nearest'})
}

export default function DesktopController(){
 const navigate=useNavigate(),location=useLocation()
 const [dialog,setDialog]=useState(null)

 useEffect(()=>{
  const api=window.careConnectDesktop
  if(!api)return
  const offNav=api.onNavigate(path=>navigate(path))
  const offCommand=api.onCommand(command=>{
   if(command==='back')navigate(-1)
   if(command==='forward')navigate(1)
   if(command==='shortcuts')setDialog('shortcuts')
   if(command==='about')setDialog('about')
  })
  return()=>{offNav?.();offCommand?.()}
 },[navigate])

 useEffect(()=>{
  const h=e=>{
   const active=document.activeElement
   if(e.key==='Escape'){if(dialog){e.preventDefault();setDialog(null)}else{active?.blur?.();document.querySelector('.side-link.active')?.focus()}return}
   if(e.altKey&&e.key==='ArrowLeft'){e.preventDefault();navigate(-1);return}
   if(e.altKey&&e.key==='ArrowRight'){e.preventDefault();navigate(1);return}
   if(e.ctrlKey&&e.shiftKey&&e.key.toLowerCase()==='r'){e.preventDefault();navigate('/choose-role');return}
   if(e.ctrlKey&&e.key==='/'){e.preventDefault();setDialog('shortcuts');return}

   const caregiver=location.pathname.startsWith('/caregiver/')
   const routes=caregiver?
    ['/caregiver/dashboard','/caregiver/medications','/caregiver/appointments','/caregiver/activity','/caregiver/notes','/settings']:
    ['/patient/home','/patient/today','/patient/schedule','/patient/medications','/patient/appointments','/patient/memories','/patient/contacts','/settings']
   if(e.ctrlKey&&/^[1-8]$/.test(e.key)){const target=routes[Number(e.key)-1];if(target){e.preventDefault();navigate(target)}return}

   // Preserve native caret/select behavior while editing.
   if(editable(active))return

   if(!e.ctrlKey&&!e.altKey&&!e.metaKey){
    if(e.key==='ArrowLeft'){e.preventDefault();spatialMove('left')}
    else if(e.key==='ArrowRight'){e.preventDefault();spatialMove('right')}
    else if(e.key==='ArrowUp'){e.preventDefault();spatialMove('up')}
    else if(e.key==='ArrowDown'){e.preventDefault();spatialMove('down')}
    else if(e.key==='Home'){e.preventDefault();edgeMove(false)}
    else if(e.key==='End'){e.preventDefault();edgeMove(true)}
    else if(e.key==='PageUp'){e.preventDefault();regionMove(-1)}
    else if(e.key==='PageDown'){e.preventDefault();regionMove(1)}
   }
  }
  window.addEventListener('keydown',h)
  return()=>window.removeEventListener('keydown',h)
 },[navigate,location.pathname,dialog])

 // On page changes, put keyboard focus on the page heading/main content.
 useEffect(()=>{
   requestAnimationFrame(()=>{
     const target=document.querySelector('#main-content h1, main h1, .auth-form h1, .role-right h1, .landing-header h1')
     const announcer=document.getElementById('route-announcer')
     const label=target?.textContent?.trim() || document.title || 'CareConnect'
     if(announcer) announcer.textContent=`${label} page`
     if(target){target.setAttribute('tabindex','-1');target.focus({preventScroll:true})}
   })
 },[location.pathname])

 if(!dialog)return null
 return <div className="desktop-modal-backdrop" data-keyboard-region="dialog">
  <div className="desktop-modal" role="dialog" aria-modal="true" aria-labelledby="keyboard-title">
   <button autoFocus className="modal-close" onClick={()=>setDialog(null)} aria-label="Close keyboard guide">×</button>
   {dialog==='about'?<><h2>CareConnect Desktop</h2><p>Accessibility-first desktop care companion.</p></>:
   <><h2 id="keyboard-title">Keyboard navigation</h2><p className="muted">Every interactive part of CareConnect can be reached without a mouse.</p>
   <div className="shortcut-list">{shortcuts.map(([k,l])=><div className="shortcut-row" key={k}><kbd>{k}</kbd><span>{l}</span></div>)}</div></>}
  </div>
 </div>
}
