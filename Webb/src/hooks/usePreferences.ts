import { useContext } from "react"
import { PreferencesContext } from "@/context/preferencesContext"

export function usePreferences() {
  const context = useContext(PreferencesContext)
  if (!context) throw new Error("usePreferences must be used within <PreferencesProvider>")
  return context
}
