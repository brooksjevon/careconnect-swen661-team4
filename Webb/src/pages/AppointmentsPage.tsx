import { AppointmentCard } from "@/components/appointments/AppointmentCard"
import { PageHeading } from "@/components/ui/PageHeading"
import { useAppointments } from "@/hooks/useCareData"

export function AppointmentsPage() {
  const { appointments } = useAppointments()

  return (
    <>
      <PageHeading title="Appointments" subtitle="Your upcoming appointments, all in one place." />
      <div className="appointment-grid">
        {appointments.map((appointment, index) => (
          <AppointmentCard key={appointment.id} appointment={appointment} featured={index === 0} />
        ))}
      </div>
    </>
  )
}
