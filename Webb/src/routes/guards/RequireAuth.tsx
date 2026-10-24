import { Navigate, Outlet } from "react-router-dom"
import { useSession } from "@/hooks/useSession"
import { PATHS } from "@/routes/paths"

/** Layout route: renders child routes only when the user is signed in. */
export function RequireAuth() {
  const { signedIn } = useSession()
  return signedIn ? <Outlet /> : <Navigate to={PATHS.signIn} replace />
}
