import { ScheduleCard } from "@/components/dashboard/ScheduleCard"
import { SummaryGrid } from "@/components/dashboard/SummaryGrid"
import { Button } from "@/components/ui/Button"
import { caregiverSummary, recipientSummary, todaySchedule } from "@/data/dashboard"
import { useSession } from "@/hooks/useSession"
import { PATHS } from "@/routes/paths"

export function DashboardPage() {
  const { role } = useSession()
  const isCaregiver = role === "caregiver"
  const summary = isCaregiver ? caregiverSummary : recipientSummary
  const appointmentsPath = isCaregiver ? PATHS.manageAppointments : PATHS.appointments

  return (
    <>
      <section className="dashboard-banner">
        <p className="eyebrow eyebrow--light">Good morning</p>
        <h1>Welcome, {isCaregiver ? "Joyce" : "Margaret"}</h1>
        <p>
          {isCaregiver ? "Here is Margaret’s care overview for today." : "Here is what is happening today."}
        </p>
      </section>

      <section className="section-block">
        <div className="section-title">
          <h2>Today’s summary</h2>
          <span>Tuesday, 24 September</span>
        </div>
        <SummaryGrid items={summary} />
      </section>

      <div className="dashboard-columns">
        <section className="section-block">
          <div className="section-title">
            <h2>What’s next today</h2>
            <Button kind="quiet" to={appointmentsPath}>
              View all
            </Button>
          </div>
          <div className="schedule-list">
            {todaySchedule.map((item) => (
              <ScheduleCard key={item.time} {...item} />
            ))}
          </div>
        </section>

        <section className="section-block quick-links">
          <h2>Quick links</h2>
          <Button kind="secondary" to={appointmentsPath} full>
            {isCaregiver ? "Manage appointments" : "View appointments"}
          </Button>
          <Button kind="secondary" to={PATHS.contacts} full>
            Call a contact
          </Button>
          <Button kind="secondary" to={PATHS.notes} full>
            {isCaregiver ? "Write a care note" : "Read caregiver notes"}
          </Button>
          <Button kind="secondary" to={PATHS.activity} full>
            Full activity log
          </Button>
        </section>
      </div>
    </>
  )
}
