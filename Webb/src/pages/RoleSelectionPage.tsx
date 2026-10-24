import { useNavigate } from "react-router-dom"
import { RoleCard } from "@/components/roles/RoleCard"
import { icons } from "@/constants/icons"
import { useSession } from "@/hooks/useSession"
import { PATHS } from "@/routes/paths"
import type { Role } from "@/store"

export function RoleSelectionPage() {
  const { selectRole } = useSession()
  const navigate = useNavigate()

  const chooseRole = (role: Role) => {
    selectRole(role)
    navigate(PATHS.dashboard)
  }

  return (
    <>
      <main className="role-layout">
        <section className="welcome-panel">
          <p className="eyebrow eyebrow--light">Everyday support, made simpler</p>
          <h1>Welcome, Margaret!</h1>
          <p className="welcome-panel__lead">How are you using CareConnect right now?</p>
          <p>Your choice is remembered. You can switch at any time.</p>
        </section>

        <section className="role-choices" aria-labelledby="choose-role">
          <p className="eyebrow" id="choose-role">
            Choose your role
          </p>
          <RoleCard
            tone="blue"
            icon={icons.recipient}
            title="I am the Care Recipient"
            description="View your daily schedule, medicines, memory aids, and contacts."
            actionLabel="Choose care recipient"
            onChoose={() => chooseRole("recipient")}
          />
          <RoleCard
            tone="green"
            icon={icons.caregiver}
            title="I am the Caregiver"
            description="Manage the care plan, add shift notes, and track medicines."
            actionLabel="Choose caregiver"
            onChoose={() => chooseRole("caregiver")}
          />
          <p className="fine-print">
            This does not affect what information is stored — only which view you see first.
          </p>
        </section>
      </main>
      <footer>CareConnect · Everyday support, not medical advice</footer>
    </>
  )
}
