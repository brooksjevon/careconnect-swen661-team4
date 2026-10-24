import { Card } from "@/components/ui/Card"
import { PageHeading } from "@/components/ui/PageHeading"
import { icons } from "@/constants/icons"
import { Icon } from "@/components/ui/Icon"

const benefits = [
  {
    icon: icons.check,
    title: "Clear at a glance",
    copy: "See what is happening today without searching through messages.",
  },
  {
    icon: icons.appointments,
    title: "One shared schedule",
    copy: "Keep appointments, medicines, notes, and daily tasks together.",
  },
  {
    icon: icons.users,
    title: "Built for care teams",
    copy: "Give family and caregivers the same calm, up-to-date view.",
  },
]

export function AboutPage() {
  return (
    <main className="about-page">
      <PageHeading
        title="Care that feels more connected"
        subtitle="A shared view of today’s care, reminders, and recent activity."
      />

      <div className="benefit-grid">
        {benefits.map(({ icon, title, copy }) => (
          <Card key={title}>
            <Icon className="small-icon" src={icon} size={20} lazy />
            <h2>{title}</h2>
            <p>{copy}</p>
          </Card>
        ))}
      </div>

      <section className="audience-section">
        <h2>Made for two kinds of people</h2>
        <div className="two-column">
          <Card tone="blue">
            <h2>For care recipients</h2>
            <p>
              Large text, simple steps, and a calm, supportive tone. CareConnect never overwhelms — it
              just shows you what’s next.
            </p>
          </Card>
          <Card tone="green">
            <h2>For caregivers</h2>
            <p>
              Stay in the loop without being in the room. Log notes, check what’s been done, and keep
              the care team aligned.
            </p>
          </Card>
        </div>
      </section>
    </main>
  )
}
