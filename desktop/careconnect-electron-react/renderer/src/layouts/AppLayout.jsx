import TopBar from '../components/TopBar'
import Sidebar from '../components/Sidebar'
import { useEffect } from 'react'
export default function AppLayout({role='patient',children}) {
  const caregiver=role==='caregiver'
  useEffect(()=>{sessionStorage.setItem('careconnect.role',role)},[role])
  return <><a className="skip-link" href="#main-content">Skip to main content</a><TopBar role={caregiver?'Caregiver':'Patient'} name={caregiver?'Joyce':'Margaret'}/><div className="app-shell"><Sidebar role={role}/><div id="route-announcer" className="sr-only" aria-live="polite" aria-atomic="true"></div><main id="main-content" className="content" tabIndex="-1" data-keyboard-region="content">{children}</main></div></>
}
