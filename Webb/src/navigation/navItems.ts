import { icons } from "@/constants/icons"
import { PATHS } from "@/routes/paths"
import type { Role } from "@/store"

export type NavItem = {
  to: string
  label: string
  icon: string
  /** Roles allowed to see this link. Omit to show it to every role. */
  roles?: Role[]
}

/** Sidebar links, in display order. Keep `roles` in sync with the router guards. */
export const navItems: NavItem[] = [
  { to: PATHS.dashboard, label: "Dashboard", icon: icons.dashboard },
  { to: PATHS.appointments, label: "Appointments", icon: icons.appointments, roles: ["recipient"] },
  { to: PATHS.contacts, label: "Contacts", icon: icons.contacts },
  { to: PATHS.notes, label: "Care notes", icon: icons.notes },
  { to: PATHS.activity, label: "Activity log", icon: icons.activity },
  {
    to: PATHS.manageAppointments,
    label: "Manage appointments",
    icon: icons.tasks,
    roles: ["caregiver"],
  },
  { to: PATHS.settings, label: "Settings", icon: icons.settings },
]

export function getNavItemsForRole(role: Role | null): NavItem[] {
  return navItems.filter((item) => !item.roles || (role !== null && item.roles.includes(role)))
}
