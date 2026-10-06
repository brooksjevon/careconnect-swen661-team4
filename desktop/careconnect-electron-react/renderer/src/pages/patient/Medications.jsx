import AppLayout from '../../layouts/AppLayout'
import { Card, PageTitle, Badge } from '../../components/UI'
import { medicines } from '../../data/mockData'
export default function Medications(){return <AppLayout><PageTitle title="Medicines" subtitle="Today's medication tracker"/><div className="notice amber-notice"><b>ⓘ &nbsp; 2 medicines still to take today.</b></div><h3 className="section-label">TODAY'S MEDICINES</h3>{medicines.map(m=><Card className="medicine-row" key={m.name}><span className="med-dot"/><div><h2 className={m.taken?'strike':''}>{m.name}</h2><p>{m.dose}</p>{m.times.map(t=><Badge key={t}>{t}</Badge>)}</div><span className={`task-check ${m.taken?'done':''}`}>{m.taken?'✓':''}</span></Card>)}</AppLayout>}
