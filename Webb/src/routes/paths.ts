/**
 * Single source of truth for every URL in the app.
 * Use these constants in <NavLink>, <Navigate>, navigate() and the router
 * instead of hard-coding strings.
 */
export const PATHS = {
  home: "/",
  signIn: "/signin",
  about: "/about",
  roles: "/roles",
  dashboard: "/dashboard",
  appointments: "/appointments",
  manageAppointments: "/manage-appointments",
  contacts: "/contacts",
  notes: "/notes",
  activity: "/activity",
  settings: "/settings",
} as const

export type AppPath = (typeof PATHS)[keyof typeof PATHS]
