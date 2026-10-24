import { useEffect, useState, type FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/Button"
import { TextField } from "@/components/ui/TextField"
import { icons } from "@/constants/icons"
import { useSession } from "@/hooks/useSession"
import { prefetchWhenIdle } from "@/routes/lazyPages"
import { PATHS } from "@/routes/paths"
import { Icon } from "@/components/ui/Icon"

const DEMO_EMAIL = "joyce@example.com"
const DEMO_PASSWORD = "careconnect"

export function SignInPage() {
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const { signIn } = useSession()

  // After this page has loaded, fetch the next pages in the sign-in flow in the background.
  useEffect(() => prefetchWhenIdle([PATHS.roles, PATHS.dashboard]), [])

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const email = String(data.get("email")).trim().toLowerCase()
    const password = data.get("password")

    if (email !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
      setError("Use the demonstration email and password shown below.")
      return
    }

    setError("")
    signIn()
    navigate(PATHS.roles)
  }

  return (
    <main className="signin-layout">
      <section className="signin-intro">
        <Icon src={icons.logo} size={48} />
        <h1>Care, connected.</h1>
        <p>One calm place for everyday support, shared routines, and the people who matter.</p>
        <p className="signin-intro__trust">
          Private by design · Simple to use · Built for real care teams
        </p>
      </section>

      <form className="signin-form" onSubmit={submit}>
        <div>
          <p className="eyebrow">Welcome back</p>
          <h1>Sign in to CareConnect</h1>
        </div>
        <TextField label="Email address" type="email" defaultValue={DEMO_EMAIL} name="email" required />
        <TextField
          label="Password"
          type="password"
          defaultValue={DEMO_PASSWORD}
          name="password"
          required
          hint={`Demo credentials: ${DEMO_EMAIL} / ${DEMO_PASSWORD}`}
        />
        {error && (
          <p role="alert" className="form-error">
            {error}
          </p>
        )}
        <Button type="submit" full>
          Sign in
        </Button>
      </form>
    </main>
  )
}
