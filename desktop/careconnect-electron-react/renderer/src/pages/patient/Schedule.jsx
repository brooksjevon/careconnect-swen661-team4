import AppLayout from '../../layouts/AppLayout'
import { Card, PageTitle, Badge } from '../../components/UI'
import { tasks } from '../../data/mockData'
export default function Schedule(){return <AppLayout><PageTitle title="My Day" subtitle="Tuesday, 24 September"/><Card><div className="between"><b>3 of 6 tasks complete</b><b>50%</b></div><div className="progress"><i/></div></Card><div className="task-list">{tasks.map(t=><Card className="task-row" key={t.time}><b className="time">{t.time}</b><div><strong className={t.done?'strike':''}>{t.title}</strong> <Badge tone={t.type==='Meal'?'amber':t.type==='Activity'?'green':'blue'}>{t.type}</Badge><small>{t.detail}</small></div><span className={`task-check ${t.done?'done':''}`}>{t.done?'✓':''}</span></Card>)}</div></AppLayout>}
