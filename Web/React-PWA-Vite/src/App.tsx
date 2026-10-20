import {
  createContext,
  FormEvent,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"
import {
  BrowserRouter,
  NavLink,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom"

const assets = "/assets"

const icons = {
  logo: `${assets}/e48d0.svg`,
  menu: `${assets}/d97a7.svg`,
  home: `${assets}/b7a44.svg`,
  today: `${assets}/6bdd4.svg`,
  appointments: `${assets}/1b7ec.svg`,
  medicines: `${assets}/f7860.svg`,
  tasks: `${assets}/0f42a.svg`,
  memories: `${assets}/30b25.svg`,
  contacts: `${assets}/2ba96.svg`,
  dashboard: `${assets}/c8abe.svg`,
  users: `${assets}/4b67b.svg`,
  notes: `${assets}/66c07.svg`,
  activity: `${assets}/14577.svg`,
  settings: `${assets}/eb355.svg`,
  check: `${assets}/52145.svg`,
  panel: `${assets}/9843b.svg`,
  recipient: `${assets}/7ae1b.svg`,
  caregiver: `${assets}/5fe90.svg`,
}

type TextSize = "standard" | "large" | "extra-large"
type Theme = "light" | "dark" | "calm"

type Preferences = {
  textSize: TextSize
  theme: Theme
  voiceEnabled: boolean
  setTextSize: (value: TextSize) => void
  setTheme: (value: Theme) => void
  setVoiceEnabled: (value: boolean) => void
  readPage: () => void
  stopReading: () => void
}

const PreferencesContext = createContext<Preferences | null>(null)

function usePreferences() {
  const context = useContext(PreferencesContext)
  if (!context)
    throw new Error("Preferences must be used within PreferencesProvider")
  return context
}

function getStoredPreference<T extends string>(key: string, fallback: T): T {
  return localStorage.getItem(key) as T | null ?? fallback
}

function PreferencesProvider({ children }: { children: ReactNode }) {
  const [textSize, setTextSize] = useState<TextSize>(() =>
    getStoredPreference("careconnect-text-size", "standard"),
  )
  const [theme, setTheme] = useState<Theme>(() =>
    getStoredPreference("careconnect-theme", "light"),
  )
  const [voiceEnabled, setVoiceEnabled] = useState(
    () => localStorage.getItem("careconnect-voice") === "true",
  )

  useEffect(() => {
    document.documentElement.dataset.textSize = textSize
    localStorage.setItem("careconnect-text-size", textSize)
  }, [textSize])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem("careconnect-theme", theme)
  }, [theme])

  useEffect(() => {
    localStorage.setItem("careconnect-voice", String(voiceEnabled))
    if (!voiceEnabled) window.speechSynthesis?.cancel()
  }, [voiceEnabled])

  const stopReading = () => window.speechSynthesis?.cancel()
  const readPage = () => {
    if (!("speechSynthesis" in window)) return
    stopReading()
    const content = document.querySelector(
      ".main-content, .role-layout, .signin-layout, .about-page",
    )
    const text = content?.textContent?.replace(/\s+/g, " ").trim()
    if (!text) return
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 0.92
    window.speechSynthesis.speak(utterance)
  }

  return (
    <PreferencesContext.Provider
      value={{
        textSize,
        theme,
        voiceEnabled,
        setTextSize,
        setTheme,
        setVoiceEnabled,
        readPage,
        stopReading,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  )
}

type ButtonProps = {
  children: ReactNode
  to?: string
  kind?: "primary" | "secondary" | "quiet"
  type?: "button" | "submit"
  onClick?: () => void
  full?: boolean
}

function Button({
  children,
  to,
  kind = "primary",
  type = "button",
  onClick,
  full = false,
}: ButtonProps) {
  const className = `button button--${kind}${full ? " button--full" : ""}`
  if (to)
    return (
      <NavLink className={className} to={to}>
        {children}
      </NavLink>
    )
  return (
    <button className={className} onClick={onClick} type={type}>
      {children}
    </button>
  )
}

function TextField({
  label,
  type = "text",
  defaultValue,
  hint,
}: {
  label: string
  type?: string
  defaultValue?: string
  hint?: string
}) {
  return (
    <label className="field">
      <span className="field__label">{label}</span>
      <input className="field__input" defaultValue={defaultValue} type={type} />
      {hint && <span className="field__hint">{hint}</span>}
    </label>
  )
}

function BrandHeader({ authenticated = false }: { authenticated?: boolean }) {
  const { voiceEnabled, readPage } = usePreferences()
  return (
    <header className="brand-header">
      {authenticated && (
        <img className="brand-header__menu" src={icons.menu} alt="" />
      )}
      <NavLink className="brand" to={authenticated ? "/dashboard" : "/"}>
        <img src={icons.logo} alt="" />
        <span>CareConnect</span>
      </NavLink>
      {authenticated && (
        <>
          <span className="brand-header__account">Caregiver · Joyce</span>
          {voiceEnabled && (
            <button className="listen-button" type="button" onClick={readPage}>
              Listen to this page
            </button>
          )}
        </>
      )}
      {!authenticated && (
        <nav className="public-nav" aria-label="Public navigation">
          <NavLink to="/about">About</NavLink>
          <NavLink to="/signin">Sign in</NavLink>
        </nav>
      )}
    </header>
  )
}

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: icons.dashboard },
  { to: "/appointments", label: "Appointments", icon: icons.appointments },
  { to: "/contacts", label: "Contacts", icon: icons.contacts },
  { to: "/notes", label: "Notes", icon: icons.notes },
  { to: "/activity", label: "Activity log", icon: icons.activity },
  {
    to: "/manage-appointments",
    label: "Manage appointments",
    icon: icons.tasks,
  },
  { to: "/settings", label: "Settings", icon: icons.settings },
]

function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="app-frame">
      <BrandHeader authenticated />
      <div className="workspace">
        <aside className={`sidebar${open ? " sidebar--open" : ""}`}>
          <button
            className="sidebar__toggle"
            type="button"
            aria-label={open ? "Collapse navigation" : "Expand navigation"}
            onClick={() => setOpen((value) => !value)}
          >
            <img src={icons.panel} alt="" />
          </button>
          <nav className="sidebar__nav" aria-label="CareConnect">
            {navItems.map((item) => (
              <NavLink
                className={({ isActive }) =>
                  `sidebar__link${isActive ? " is-active" : ""}`
                }
                key={item.to}
                to={item.to}
                title={item.label}
              >
                <img src={item.icon} alt="" />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </aside>
        <main className="main-content">{children}</main>
      </div>
    </div>
  )
}

function PageHeading({ title, subtitle }: { title: string, subtitle: string }) {
  return (
    <div className="page-heading">
      <p className="eyebrow">Tuesday, 24 September · 10:32 am</p>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </div>
  )
}

function Card({
  children,
  tone = "white",
  className = "",
}: {
  children: ReactNode
  tone?: "white" | "blue" | "green" | "red" | "amber"
  className?: string
}) {
  return (
    <section className={`card card--${tone} ${className}`}>{children}</section>
  )
}

function RoleSelection() {
  return (
    <div className="public-page">
      <BrandHeader />
      <main className="role-layout">
        <section className="welcome-panel">
          <p className="eyebrow eyebrow--light">
            Everyday support, made simpler
          </p>
          <h1>Welcome, Margaret!</h1>
          <p className="welcome-panel__lead">
            How are you using CareConnect right now?
          </p>
          <p>Your choice is remembered. You can switch at any time.</p>
        </section>
        <section className="role-choices">
          <p className="eyebrow">Choose your role</p>
          <Card tone="blue">
            <img className="role-icon" src={icons.recipient} alt="" />
            <h2>I am the Care Recipient</h2>
            <p>
              View your daily schedule, medicines, memory aids, and contacts.
            </p>
            <Button to="/dashboard" full>
              Choose care recipient →
            </Button>
          </Card>
          <Card tone="green">
            <img className="role-icon" src={icons.caregiver} alt="" />
            <h2>I am the Caregiver</h2>
            <p>Manage the care plan, add shift notes, and track medicines.</p>
            <Button to="/signin" full>
              Choose caregiver →
            </Button>
          </Card>
          <p className="fine-print">
            This does not affect what information is stored — only which view
            you see first.
          </p>
        </section>
      </main>
      <footer>CareConnect · Everyday support, not medical advice</footer>
    </div>
  )
}

function AboutPage() {
  const benefits = [
    [
      icons.check,
      "Clear at a glance",
      "See what is happening today without searching through messages.",
    ],
    [
      icons.appointments,
      "One shared schedule",
      "Keep appointments, medicines, notes, and daily tasks together.",
    ],
    [
      icons.users,
      "Built for care teams",
      "Give family and caregivers the same calm, up-to-date view.",
    ],
  ]
  return (
    <div className="public-page">
      <BrandHeader />
      <main className="about-page">
        <PageHeading
          title="Care that feels more connected"
          subtitle="A shared view of today’s care, reminders, and recent activity."
        />
        <div className="benefit-grid">
          {benefits.map(([icon, title, copy]) => (
            <Card key={title}>
              <img className="small-icon" src={icon} alt="" />
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
                Large text, simple steps, and a calm, supportive tone.
                CareConnect never overwhelms — it just shows you what’s next.
              </p>
            </Card>
            <Card tone="green">
              <h2>For caregivers</h2>
              <p>
                Stay in the loop without being in the room. Log notes, check
                what’s been done, and keep the care team aligned.
              </p>
            </Card>
          </div>
        </section>
      </main>
    </div>
  )
}

function SignInPage() {
  const navigate = useNavigate()
  const submit = (event: FormEvent) => {
    event.preventDefault()
    navigate("/dashboard")
  }
  return (
    <div className="public-page">
      <BrandHeader />
      <main className="signin-layout">
        <section className="signin-intro">
          <img src={icons.logo} alt="" />
          <h1>Care, connected.</h1>
          <p>
            One calm place for everyday support, shared routines, and the people
            who matter.
          </p>
          <p className="signin-intro__trust">
            Private by design · Simple to use · Built for real care teams
          </p>
        </section>
        <form className="signin-form" onSubmit={submit}>
          <div>
            <p className="eyebrow">Welcome back</p>
            <h1>Sign in to CareConnect</h1>
          </div>
          <TextField
            label="Email address"
            type="email"
            defaultValue="joyce@example.com"
          />
          <TextField
            label="Password"
            type="password"
            defaultValue="careconnect"
            hint="For this demonstration, any password will work."
          />
          <Button type="submit" full>
            Sign in
          </Button>
          <Button kind="secondary" to="/" full>
            Choose a different role
          </Button>
        </form>
      </main>
    </div>
  )
}

const summary = [
  ["Tasks done", "2 / 6"],
  ["Medicines left", "2 of 5"],
  ["Appointments", "2 this week"],
  ["Memory cards", "5 active items"],
]

function DashboardPage() {
  return (
    <AppShell>
      <section className="dashboard-banner">
        <p className="eyebrow eyebrow--light">Good morning</p>
        <h1>Welcome, Margaret</h1>
        <p>Here is what is happening today.</p>
      </section>
      <section className="section-block">
        <div className="section-title">
          <h2>Today’s summary</h2>
          <span>Tuesday, 24 September</span>
        </div>
        <div className="summary-grid">
          {summary.map(([label, value]) => (
            <Card key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </Card>
          ))}
        </div>
      </section>
      <div className="dashboard-columns">
        <section className="section-block">
          <div className="section-title">
            <h2>What’s next today</h2>
            <Button kind="quiet" to="/appointments">
              View all
            </Button>
          </div>
          <div className="schedule-list">
            <ScheduleCard
              time="8:30 am"
              title="Breakfast"
              copy="Porridge and tea"
              status="Done"
            />
            <ScheduleCard
              time="10:00 am"
              title="Morning walk"
              copy="Round the garden, 15 minutes"
            />
            <ScheduleCard
              time="12:30 pm"
              title="Lunch"
              copy="Sandwich and fruit"
            />
          </div>
        </section>
        <section className="section-block quick-links">
          <h2>Quick links</h2>
          <Button kind="secondary" to="/appointments" full>
            View appointments
          </Button>
          <Button kind="secondary" to="/contacts" full>
            Call a contact
          </Button>
          <Button kind="secondary" to="/notes" full>
            Read caregiver notes
          </Button>
          <Button kind="secondary" to="/activity" full>
            Full activity log
          </Button>
        </section>
      </div>
    </AppShell>
  )
}

function ScheduleCard({
  time,
  title,
  copy,
  status,
}: {
  time: string
  title: string
  copy: string
  status?: string
}) {
  return (
    <Card>
      <span className="schedule-time">{time}</span>
      <h3>{title}</h3>
      <p>{copy}</p>
      {status && <span className="status status--green">{status}</span>}
    </Card>
  )
}

const appointments = [
  [
    "Annual health review",
    "Monday, 30 Sep — 10:00 am",
    "Greenfield Surgery",
    "Maria is coming with you",
  ],
  [
    "Blood test",
    "Thursday, 3 Oct — 9:00 am",
    "Greenfield Surgery",
    "Book transport",
  ],
  [
    "GP phone call",
    "Wednesday, 16 Oct — 11:00 am",
    "Telephone appointment",
    "The GP will call you",
  ],
  [
    "Dentist check-up",
    "Friday, 19 Oct — 2:00 pm",
    "Westfield Dental",
    "Joyce is coming with you",
  ],
]

function AppointmentsPage() {
  return (
    <AppShell>
      <PageHeading
        title="Appointments"
        subtitle="Your upcoming appointments, all in one place."
      />
      <div className="appointment-grid">
        {appointments.map(([title, date, place, note], index) => (
          <Card
            key={title}
            className={
              index === 0
                ? "appointment-card appointment-card--featured"
                : "appointment-card"
            }
          >
            <span
              className={`status ${
                index === 0 ? "status--blue" : "status--green"
              }`}
            >
              {index === 0 ? "Next appointment" : "Coming up"}
            </span>
            <h2>{title}</h2>
            <strong>{date}</strong>
            <p>{place}</p>
            <p className="card-note">{note}</p>
            {place !== "Telephone appointment" && (
              <Button kind="secondary">Get directions</Button>
            )}
          </Card>
        ))}
      </div>
    </AppShell>
  )
}

const contacts = [
  ["Emergency", "Joyce Miller", "07700 900 123", "red"],
  ["Emergency", "Emergency services", "999", "red"],
  ["Carer", "Maria Thompson", "07700 900 456", "blue"],
  ["Family", "David Miller", "07700 900 789", "green"],
  ["Doctor", "Greenfield Surgery", "07700 900 123", "blue"],
  ["Family", "Helen Walker", "07700 900 321", "green"],
] as const

function ContactsPage() {
  return (
    <AppShell>
      <PageHeading
        title="Contacts"
        subtitle="People who are here to help you"
      />
      <div className="contact-grid">
        {contacts.map(([role, name, phone, tone]) => (
          <Card tone={tone} key={`${name}-${phone}`}>
            <span className="eyebrow">{role}</span>
            <h2>{name}</h2>
            <a
              className="phone-number"
              href={`tel:${phone.replace(" ", "")}`}
            >
              {phone}
            </a>
            <Button kind="secondary">Call now</Button>
          </Card>
        ))}
      </div>
      <Card tone="blue" className="handoff">
        <img src={icons.contacts} alt="" />
        <div>
          <h2>Using another phone?</h2>
          <p>Share these numbers with the person helping you today.</p>
        </div>
        <Button kind="secondary">Copy all numbers</Button>
      </Card>
    </AppShell>
  )
}

const notes = [
  [
    "Today · 9:15 am",
    "Routine",
    "Margaret ate all of her breakfast and seemed cheerful this morning.",
    "Maria Thompson",
  ],
  [
    "Yesterday · 6:40 pm",
    "Urgent",
    "Please check the repeat prescription before Friday. There are only two tablets left.",
    "Joyce Miller",
  ],
  [
    "Monday · 2:30 pm",
    "Routine",
    "Lovely walk in the garden. Margaret remembered the roses near the back gate.",
    "Maria Thompson",
  ],
]

function NotesPage() {
  return (
    <AppShell>
      <PageHeading
        title="Caregiver notes"
        subtitle="Daily observations for Dorothy’s care team"
      />
      <Card className="note-composer">
        <div>
          <span className="eyebrow">New note</span>
          <h2>Share an update with the care team</h2>
        </div>
        <TextField
          label="Note"
          defaultValue="Margaret had a settled morning."
        />
        <Button>Add note</Button>
      </Card>
      <div className="note-grid">
        {notes.map(([date, priority, copy, author]) => (
          <Card tone={priority === "Urgent" ? "red" : "white"} key={date}>
            <div className="note-meta">
              <span>{date}</span>
              <span
                className={`status ${
                  priority === "Urgent" ? "status--red" : "status--blue"
                }`}
              >
                {priority}
              </span>
            </div>
            <p className="note-copy">{copy}</p>
            <strong>{author}</strong>
          </Card>
        ))}
      </div>
    </AppShell>
  )
}

const events = [
  ["8:12 am", "Marked Memantine as taken", "Medication taken"],
  ["10:15 am", "Checked in at 10:15 am", "Checked in"],
  ["10:30 am", "Task completed: Morning walk", "Task completed"],
  ["12:30 pm", "Unmarked Amlodipine", "Medication unmarked"],
  ["3:00 pm", "Marked Vitamin D3 as taken", "Medication taken"],
]

function ActivityPage() {
  return (
    <AppShell>
      <PageHeading
        title="Activity log"
        subtitle="Margaret’s recent actions — medication taken, check-ins, and tasks"
      />
      <div className="filter-row">
        <Button>All activity</Button>
        <Button kind="secondary">Medicines</Button>
        <Button kind="secondary">Check-ins</Button>
        <Button kind="secondary">Tasks</Button>
      </div>
      <section className="timeline">
        <h2>Today</h2>
        {events.map(([time, title, type]) => (
          <article className="timeline__event" key={`${time}-${title}`}>
            <span className="timeline__dot" />
            <time>{time}</time>
            <div>
              <h3>{title}</h3>
              <p>
                {type.toUpperCase()} · {time}
              </p>
            </div>
          </article>
        ))}
      </section>
    </AppShell>
  )
}

function ManageAppointmentsPage() {
  const [saved, setSaved] = useState(false)
  return (
    <AppShell>
      <PageHeading
        title="Manage appointments"
        subtitle="Add, edit, or remove Margaret’s upcoming appointments"
      />
      <div className="manage-layout">
        <section>
          <div className="section-title">
            <h2>Scheduled (3)</h2>
            <Button>+ Add appointment</Button>
          </div>
          <div className="manage-list">
            {appointments.slice(0, 3).map(([title, date, place], index) => (
              <Card tone={index === 0 ? "blue" : "white"} key={title}>
                <h2>{title}</h2>
                <strong>{date}</strong>
                <p>{place}</p>
                <div className="button-row">
                  <Button kind="secondary">Edit</Button>
                  <Button kind="quiet">Delete</Button>
                </div>
              </Card>
            ))}
          </div>
        </section>
        <form
          className="editor-card"
          onSubmit={(event) => {
            event.preventDefault()
            setSaved(true)
          }}
        >
          <p className="eyebrow">Edit appointment · Selected</p>
          <h2>Vision Plus Opticians</h2>
          <TextField
            label="Appointment title *"
            defaultValue="Vision Plus Opticians"
            hint="Use plain language Margaret will recognise."
          />
          <div className="two-column">
            <TextField label="Date *" type="date" defaultValue="2026-09-24" />
            <TextField label="Time *" type="time" defaultValue="15:30" />
          </div>
          <TextField label="Location" defaultValue="22 High Street" />
          <TextField label="Caregiver" defaultValue="Maria Thompson" />
          {saved && <p className="save-message">Appointment saved.</p>}
          <Button type="submit" full>
            Save changes
          </Button>
        </form>
      </div>
    </AppShell>
  )
}

function ChoiceGroup<T extends string>({
  label,
  value,
  choices,
  onChange,
}: {
  label: string
  value: T
  choices: { value: T, title: string, description: string }[]
  onChange: (value: T) => void
}) {
  return (
    <fieldset className="choice-group">
      <legend>{label}</legend>
      <div className="choice-grid">
        {choices.map((choice) => (
          <label
            className={`choice-card${
              value === choice.value ? " is-selected" : ""
            }`}
            key={choice.value}
          >
            <input
              checked={value === choice.value}
              name={label}
              type="radio"
              value={choice.value}
              onChange={() => onChange(choice.value)}
            />
            <span>
              <strong>{choice.title}</strong>
              <small>{choice.description}</small>
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}

function SettingsPage() {
  const {
    textSize,
    theme,
    voiceEnabled,
    setTextSize,
    setTheme,
    setVoiceEnabled,
    readPage,
    stopReading,
  } = usePreferences()

  return (
    <AppShell>
      <PageHeading
        title="Settings"
        subtitle="Make CareConnect more comfortable for you to read and use."
      />
      <div className="settings-stack">
        <Card>
          <ChoiceGroup
            label="Text size"
            value={textSize}
            onChange={setTextSize}
            choices={[
              {
                value: "standard",
                title: "Standard",
                description: "The default CareConnect text size.",
              },
              {
                value: "large",
                title: "Large",
                description: "Larger text throughout the app.",
              },
              {
                value: "extra-large",
                title: "Extra large",
                description: "The largest, most readable option.",
              },
            ]}
          />
        </Card>
        <Card>
          <ChoiceGroup
            label="Colour theme"
            value={theme}
            onChange={setTheme}
            choices={[
              {
                value: "light",
                title: "Light",
                description: "Bright surfaces and dark text.",
              },
              {
                value: "dark",
                title: "Dark",
                description: "Reduced brightness with light text.",
              },
              {
                value: "calm",
                title: "Calm blue",
                description: "A softer blue-tinted background.",
              },
            ]}
          />
        </Card>
        <Card>
          <div className="setting-row">
            <div>
              <h2>Voice reading</h2>
              <p>
                Show a listening control in the header that reads the current
                page aloud.
              </p>
            </div>
            <label className="switch">
              <input
                checked={voiceEnabled}
                type="checkbox"
                onChange={(event) => setVoiceEnabled(event.target.checked)}
              />
              <span aria-hidden="true" />
              <b>{voiceEnabled ? "On" : "Off"}</b>
            </label>
          </div>
          <div className="button-row">
            <Button kind="secondary" onClick={readPage}>
              Test voice reading
            </Button>
            <Button kind="quiet" onClick={stopReading}>
              Stop reading
            </Button>
          </div>
        </Card>
        <Card tone="blue">
          <p className="eyebrow">Preview</p>
          <h2>This is how your text will look</h2>
          <p>
            Your settings are saved on this device and will still be here the
            next time you open CareConnect.
          </p>
        </Card>
      </div>
    </AppShell>
  )
}

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RoleSelection />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/appointments" element={<AppointmentsPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/notes" element={<NotesPage />} />
        <Route path="/activity" element={<ActivityPage />} />
        <Route
          path="/manage-appointments"
          element={<ManageAppointmentsPage />}
        />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default function App() {
  return (
    <PreferencesProvider>
      <Router />
    </PreferencesProvider>
  )
}
