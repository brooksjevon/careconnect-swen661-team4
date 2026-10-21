import { NavLink } from 'react-router-dom'
import { CalendarDays, Contact, History, House, Images, LayoutDashboard, NotebookPen, Pill, Users, Settings } from 'lucide-react'

const patient=[
  ['Today','/patient/today',House],['Schedule','/patient/schedule',CalendarDays],['Medications','/patient/medications',Pill],
  ['Appointments','/patient/appointments',CalendarDays],['Memories','/patient/memories',Images],['Contacts','/patient/contacts',Contact],['Settings','/settings',Settings]
]
const caregiver=[
  ['Dashboard','/caregiver/dashboard',LayoutDashboard],['Patients','/caregiver/dashboard',Users],['Manage medications','/caregiver/medications',Pill],
  ['Manage appointments','/caregiver/appointments',CalendarDays],['Activity log','/caregiver/activity',History],['Notes','/caregiver/notes',NotebookPen],['Settings','/settings',Settings]
]
export default function Sidebar({role='patient'}) {
  const links=role==='caregiver'?caregiver:patient
  return <aside className="sidebar" role="navigation" aria-label="Main navigation" data-keyboard-region="navigation">{links.map(([label,to,Icon])=><NavLink key={label} to={to} className={({isActive})=>`side-link ${isActive?'active':''}`}>
    <Icon size={20}/><span>{label}</span>
  </NavLink>)}</aside>
}
