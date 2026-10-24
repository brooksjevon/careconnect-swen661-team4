import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { StatusBadge } from "@/components/ui/StatusBadge"
import type { Appointment } from "@/store"

const TELEPHONE_APPOINTMENT = "Telephone appointment"

const directionsUrl = (location: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`

type AppointmentCardProps = {
  appointment: Appointment
  /** Highlights the card as the next upcoming appointment. */
  featured?: boolean
}

/** Read-only appointment card shown to the care recipient. */
export function AppointmentCard({ appointment, featured = false }: AppointmentCardProps) {
  const { title, date, time, location, caregiver } = appointment

  return (
    <Card className={featured ? "appointment-card appointment-card--featured" : "appointment-card"}>
      <StatusBadge tone={featured ? "blue" : "green"}>{featured ? "Next appointment" : "Coming up"}</StatusBadge>
      <h2>{title}</h2>
      <strong>
        {date} · {time}
      </strong>
      <p>{location}</p>
      <p className="card-note">{caregiver}</p>
      {location !== TELEPHONE_APPOINTMENT && (
        <Button kind="secondary" href={directionsUrl(location)} external>
          Get directions
        </Button>
      )}
    </Card>
  )
}
