import { Card } from "@/components/ui/Card"
import { StatusBadge } from "@/components/ui/StatusBadge"
import type { ScheduleItem } from "@/data/dashboard"

export function ScheduleCard({ time, title, copy, status }: ScheduleItem) {
  return (
    <Card>
      <span className="schedule-time">{time}</span>
      <h3>{title}</h3>
      <p>{copy}</p>
      {status && <StatusBadge tone="green">{status}</StatusBadge>}
    </Card>
  )
}
