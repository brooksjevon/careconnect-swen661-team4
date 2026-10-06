import Brand from './Brand'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function TopBar({role='Patient',name='Margaret'}) {
  const caregiver=role==='Caregiver'
  const navigate=useNavigate()

  return <header className="topbar">
    <div className="topbar-left">
      <Brand/>
      <div className="desktop-nav-buttons" aria-label="Navigation">
        <button title="Back (Alt+Left)" onClick={()=>navigate(-1)}><ArrowLeft size={18}/></button>
        <button title="Forward (Alt+Right)" onClick={()=>navigate(1)}><ArrowRight size={18}/></button>
      </div>
    </div>
    <div className="top-date">Tuesday, 24 September · 10:42 am</div>
    <div className="profile">
      <span className={`role-pill ${caregiver?'caregiver':''}`}>{role}</span>
      <span className="avatar">{name[0]}</span><strong>{name}</strong>
    </div>
  </header>
}
