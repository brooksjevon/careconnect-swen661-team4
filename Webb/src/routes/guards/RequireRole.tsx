import { Navigate, Outlet } from "react-router-dom"
import { useSession } from "@/hooks/useSession"
import { PATHS } from "@/routes/paths"
import type { Role } from "@/store"

type RequireRoleProps = {
  /** Roles allowed through. Omit to accept any role, as long as one has been chosen. */
  allow?: Role[]
}

/**
 * Layout route: requires a chosen role.
 * - No role yet        → role selection page
 * - Role not in `allow` → dashboard
 */
export function RequireRole({ allow }: RequireRoleProps) {
  const { role } = useSession()

  if (!role) return <Navigate to={PATHS.roles} replace />
  if (allow && !allow.includes(role)) return <Navigate to={PATHS.dashboard} replace />

  return <Outlet />
}
