import { RouterProvider } from "react-router-dom"
import { PreferencesProvider } from "@/context/PreferencesProvider"
import { router } from "@/routes/router"

export default function App() {
  return (
    <PreferencesProvider>
      <RouterProvider router={router} />
    </PreferencesProvider>
  )
}
