import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import type { Appointment } from "@/store"

type AppointmentListItemProps = {
  appointment: Appointment
  onEdit: (appointment: Appointment) => void
  onDelete: (appointment: Appointment) => void
}

/** Appointment row with edit/delete actions, used by caregivers. */
export function AppointmentListItem({ appointment, onEdit, onDelete }: AppointmentListItemProps) {
  return (
    <Card>
      <h2>{appointment.title}</h2>
      <strong>
        {appointment.date} · {appointment.time}
      </strong>
      <p>{appointment.location}</p>
      <div className="button-row">
        <Button kind="secondary" onClick={() => onEdit(appointment)}>
          Edit<span className="visually-hidden"> {appointment.title}</span>
        </Button>
        <Button kind="quiet" onClick={() => onDelete(appointment)}>
          Delete<span className="visually-hidden"> {appointment.title}</span>
        </Button>
      </div>
    </Card>
  )
}
