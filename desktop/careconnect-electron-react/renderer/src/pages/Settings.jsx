import AppLayout from '../layouts/AppLayout'
import { Card, PageTitle, Button, SectionLabel } from '../components/UI'
import { useSettings } from '../components/SettingsProvider'
import { nextFontSize } from '../utils/settings'
import { Minus, Plus, Moon, Sun, Palette, RotateCcw } from 'lucide-react'

const themes=[
  ['ocean','Ocean','Calm blue'],
  ['emerald','Emerald','Fresh green'],
  ['violet','Violet','Soft purple'],
  ['warm','Warm','Comforting amber']
]

export default function Settings(){
 const {settings,update,reset}=useSettings()
 const role=sessionStorage.getItem('careconnect.role')||'patient'
 return <AppLayout role={role}>
   <PageTitle title="Settings" subtitle="Personalize CareConnect for your comfort and accessibility"/>
   <SectionLabel>TEXT SIZE</SectionLabel>
   <Card className="settings-card">
    <div className="setting-row"><div><h2>Font size</h2><p>Increase text throughout the application.</p></div>
      <div className="font-controls">
       <Button aria-label="Decrease font size" onClick={()=>update('fontSize',nextFontSize(settings.fontSize,-1))}><Minus size={18}/></Button>
       <strong className="font-size-name">{settings.fontSize}</strong>
       <Button aria-label="Increase font size" onClick={()=>update('fontSize',nextFontSize(settings.fontSize,1))}><Plus size={18}/></Button>
      </div>
    </div>
    <div className="font-preview">Aa &nbsp; CareConnect should always be comfortable to read.</div>
   </Card>
   <SectionLabel>APPEARANCE</SectionLabel>
   <Card className="settings-card">
    <h2>Display mode</h2><p>Choose the appearance that is most comfortable for your eyes.</p>
    <div className="choice-grid two-choice">
      <button className={`setting-choice ${settings.mode==='light'?'chosen':''}`} onClick={()=>update('mode','light')}><Sun/><strong>Light</strong><span>Bright background</span></button>
      <button className={`setting-choice ${settings.mode==='dark'?'chosen':''}`} onClick={()=>update('mode','dark')}><Moon/><strong>Dark</strong><span>Reduced brightness</span></button>
    </div>
   </Card>
   <SectionLabel>COLOR THEME</SectionLabel>
   <Card className="settings-card">
    <div className="setting-title"><Palette/><div><h2>Application theme</h2><p>Choose the accent color used for navigation, buttons, and highlights.</p></div></div>
    <div className="theme-grid">{themes.map(([id,name,desc])=><button key={id} className={`theme-choice ${settings.theme===id?'chosen':''}`} onClick={()=>update('theme',id)}><i className={`theme-swatch ${id}`}/><strong>{name}</strong><span>{desc}</span></button>)}</div>
   </Card>
   
   <SectionLabel>WINDOWS NOTIFICATIONS</SectionLabel>
   <Card className="settings-card">
    <div className="setting-row">
      <div><h2>Desktop reminders</h2><p>CareConnect can use Windows notifications for medication and appointment reminders.</p></div>
      <Button onClick={()=>window.careConnectDesktop?.showNotification?.('CareConnect reminder','This is a test Windows notification.')} aria-label="Send test Windows notification">Test notification</Button>
    </div>
   </Card>

   <div className="settings-footer"><Button onClick={reset}><RotateCcw size={17}/> Reset to defaults</Button><span>Changes are saved automatically.</span></div>
 </AppLayout>
}
