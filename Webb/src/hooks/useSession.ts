import { useCallback } from "react"
import { actions, selectRole, selectSignedIn, useAppDispatch, useAppSelector, type Role } from "@/store"

/** Demo session state (signed in + chosen role) backed by the Redux store. */
export function useSession() {
  const dispatch = useAppDispatch()
  const signedIn = useAppSelector(selectSignedIn)
  const role = useAppSelector(selectRole)

  const signIn = useCallback(() => dispatch(actions.signIn()), [dispatch])
  const signOut = useCallback(() => dispatch(actions.signOut()), [dispatch])
  const selectRoleFor = useCallback((value: Role) => dispatch(actions.chooseRole(value)), [dispatch])

  return { signedIn, role, signIn, signOut, selectRole: selectRoleFor }
}
