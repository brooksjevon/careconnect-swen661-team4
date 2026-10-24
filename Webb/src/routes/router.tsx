import { createBrowserRouter, Navigate, type RouteObject } from "react-router-dom"
import { AppLayout } from "@/layouts/AppLayout"
import { PublicLayout } from "@/layouts/PublicLayout"
import { SignInPage } from "@/pages/SignInPage"
import { RequireAuth } from "./guards/RequireAuth"
import { RequireRole } from "./guards/RequireRole"
import { lazyRoute } from "./lazyPages"
import { PATHS } from "./paths"

/** Shown only while a page's code is still downloading on a cold load. */
function PageLoading() {
  return (
    <p className="page-loading" role="status">
      Loading…
    </p>
  )
}

/**
 * Route tree
 *
 * PublicLayout (header with About / Sign in)
 * ├── /            → redirect to /signin
 * ├── /signin      SignInPage
 * ├── /about       AboutPage
 * └── RequireAuth
 *     └── /roles   RoleSelectionPage
 *
 * RequireAuth → RequireRole (any role) → AppLayout (header + sidebar)
 * ├── /dashboard            DashboardPage
 * ├── /contacts             ContactsPage
 * ├── /notes                NotesPage
 * ├── /activity             ActivityPage
 * ├── /settings             SettingsPage
 * ├── RequireRole [recipient]
 * │   └── /appointments     AppointmentsPage
 * └── RequireRole [caregiver]
 *     └── /manage-appointments  ManageAppointmentsPage
 *
 * *  → redirect to /
 */
export const routes: RouteObject[] = [
  {
    id: "root",
    HydrateFallback: PageLoading,
    children: [
      {
        element: <PublicLayout />,
        children: [
          { path: PATHS.home, element: <Navigate to={PATHS.signIn} replace /> },
          { path: PATHS.signIn, element: <SignInPage /> },
          { path: PATHS.about, lazy: lazyRoute(PATHS.about) },
          {
            element: <RequireAuth />,
            children: [{ path: PATHS.roles, lazy: lazyRoute(PATHS.roles) }],
          },
        ],
      },
      {
        element: <RequireAuth />,
        children: [
          {
            element: <RequireRole />,
            children: [
              {
                element: <AppLayout />,
                children: [
                  { path: PATHS.dashboard, lazy: lazyRoute(PATHS.dashboard) },
                  { path: PATHS.contacts, lazy: lazyRoute(PATHS.contacts) },
                  { path: PATHS.notes, lazy: lazyRoute(PATHS.notes) },
                  { path: PATHS.activity, lazy: lazyRoute(PATHS.activity) },
                  { path: PATHS.settings, lazy: lazyRoute(PATHS.settings) },
                  {
                    element: <RequireRole allow={["recipient"]} />,
                    children: [{ path: PATHS.appointments, lazy: lazyRoute(PATHS.appointments) }],
                  },
                  {
                    element: <RequireRole allow={["caregiver"]} />,
                    children: [{ path: PATHS.manageAppointments, lazy: lazyRoute(PATHS.manageAppointments) }],
                  },
                ],
              },
            ],
          },
        ],
      },
      { path: "*", element: <Navigate to={PATHS.home} replace /> },
    ],
  },
]

export const router = createBrowserRouter(routes)
