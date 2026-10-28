import { Link } from 'react-router-dom'
import Brand from '../../components/Brand'
import { CalendarDays, Heart, Pill, ShieldCheck } from 'lucide-react'
export default function Landing(){return <div className="landing">
<header className="landing-header"><Brand/><div><Link className="button outline" to="/signin">Sign in</Link> <Link className="button primary" to="/signup">Sign up</Link></div></header>
<section className="landing-hero"><div className="landing-inner"><span className="mini-brand">♥ CareConnect</span><h1>Your daily companion<br/>for calm, confident care.</h1><p>For people who need a little help remembering, and the people who care for them.</p><div className="hero-actions"><Link className="button light" to="/signup">Get started — it's free ›</Link><Link className="button ghost" to="/signin">I already have an account</Link></div></div></section>
<section className="marketing"><h2>How CareConnect helps</h2><p className="muted center">Designed to be calm, clear, and reassuring — not clinical.</p><div className="three-col">
<div className="card feature"><Pill/><h3>Stay on top of medications</h3><p>A clear daily checklist shows every medicine and the right time to take it.</p></div>
<div className="card feature"><CalendarDays/><h3>Never miss an appointment</h3><p>Your full day is laid out simply: meals, rest, activities, and appointments.</p></div>
<div className="card feature"><ShieldCheck/><h3>Stay connected to your caregiver</h3><p>Caregivers can leave notes, check progress, and view the same schedule.</p></div></div>
<h2 className="spaced">Made for two kinds of people</h2><div className="two-col"><div className="card role-info"><Heart/><h3>For care recipients</h3><p>Large text, simple steps, and a warm, supportive tone.</p><ul><li>Today's schedule at a glance</li><li>Medication reminders</li><li>Memory cards</li><li>One-tap contact</li></ul></div><div className="card role-info green-border"><ShieldCheck/><h3>For caregivers</h3><p>Stay in the loop without being in the room.</p><ul><li>Real-time schedule view</li><li>Medication tracking</li><li>Shift notes</li><li>Emergency contact list</li></ul></div></div></section>
<footer className="footer"><Brand light/><p>© 2026 CareConnect. For informational use only.</p></footer></div>}
