export type Role = "recipient" | "caregiver"

export type Appointment = {
  id: string
  title: string
  date: string
  time: string
  location: string
  caregiver: string
}

export type NotePriority = "Routine" | "Urgent"

export type Note = {
  id: string
  date: string
  priority: NotePriority
  copy: string
  author: string
}

export type ActivityType = "Medicines" | "Check-ins" | "Tasks"

export type Activity = {
  id: string
  time: string
  title: string
  type: ActivityType
}

export type CareState = {
  signedIn: boolean
  role: Role | null
  appointments: Appointment[]
  notes: Note[]
  activities: Activity[]
}

/** The part of the state that is saved to localStorage (never the session). */
export type PersistedCareData = Pick<CareState, "appointments" | "notes" | "activities">
