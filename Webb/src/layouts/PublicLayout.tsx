import { Outlet, ScrollRestoration } from "react-router-dom"
import { BrandHeader } from "@/components/layout/BrandHeader"

/** Layout for pages shown before a role is chosen (sign in, about, role selection). */
export function PublicLayout() {
  return (
    <div className="public-page">
      <BrandHeader />
      <Outlet />
      <ScrollRestoration />
    </div>
  )
}
