import type { ComponentType } from "react"
import { PATHS } from "./paths"

/**
 * Route-level code splitting. Each page is its own chunk, downloaded the first
 * time it is needed. Browsers cache dynamic imports, so prefetching a page and
 * later navigating to it downloads the file only once.
 *
 * The sign-in page is not listed here: it is the landing page, so it ships in
 * the main bundle.
 */
const pages: Record<string, () => Promise<ComponentType>> = {
  [PATHS.about]: () => import("@/pages/AboutPage").then((m) => m.AboutPage),
  [PATHS.roles]: () => import("@/pages/RoleSelectionPage").then((m) => m.RoleSelectionPage),
  [PATHS.dashboard]: () => import("@/pages/DashboardPage").then((m) => m.DashboardPage),
  [PATHS.appointments]: () => import("@/pages/AppointmentsPage").then((m) => m.AppointmentsPage),
  [PATHS.manageAppointments]: () => import("@/pages/ManageAppointmentsPage").then((m) => m.ManageAppointmentsPage),
  [PATHS.contacts]: () => import("@/pages/ContactsPage").then((m) => m.ContactsPage),
  [PATHS.notes]: () => import("@/pages/NotesPage").then((m) => m.NotesPage),
  [PATHS.activity]: () => import("@/pages/ActivityPage").then((m) => m.ActivityPage),
  [PATHS.settings]: () => import("@/pages/SettingsPage").then((m) => m.SettingsPage),
}

/** For a route's `lazy` option: loads the page's chunk and returns it as the route Component. */
export const lazyRoute = (path: string) => async () => {
  const load = pages[path]
  if (!load) throw new Error(`No lazy page registered for ${path}`)
  return { Component: await load() }
}

/** Starts downloading a page's code without rendering it (e.g. on link hover). Safe to call repeatedly. */
export function prefetchRoute(path: string) {
  pages[path]?.().catch(() => {
    // Offline or a failed request: the route will retry when actually visited.
  })
}

/** Prefetches pages once the browser is idle, so it never competes with the current page. */
export function prefetchWhenIdle(paths: string[]) {
  const run = () => paths.forEach(prefetchRoute)
  // Safari has no requestIdleCallback, so fall back to a short timeout there.
  if (typeof window.requestIdleCallback === "function") {
    const id = window.requestIdleCallback(run, { timeout: 3000 })
    return () => window.cancelIdleCallback(id)
  }
  const timer = window.setTimeout(run, 1500)
  return () => window.clearTimeout(timer)
}
