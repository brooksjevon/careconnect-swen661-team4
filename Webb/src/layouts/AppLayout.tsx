import { Outlet, ScrollRestoration } from "react-router-dom"
import { BrandHeader } from "@/components/layout/BrandHeader"
import { Sidebar } from "@/components/layout/Sidebar"
import { useNavigationDrawer } from "@/hooks/useNavigationDrawer"

/**
 * Layout for every signed-in page: header + navigation + main content.
 *
 * Navigation by screen size (styles in index.css, behaviour in useNavigationDrawer):
 * - Desktop (≥1024px): full sidebar, always visible.
 * - Tablet (768–1023px): icon rail; its toggle expands it over the content.
 * - Mobile (<768px): hidden; the header's menu button opens an off-canvas drawer.
 */
export function AppLayout() {
  const nav = useNavigationDrawer()

  return (
    <div className="app-frame">
      <BrandHeader authenticated navOpen={nav.open} onMenuClick={nav.toggle} />
      <div className="workspace">
        <Sidebar open={nav.open} onToggle={nav.toggle} onNavigate={nav.close} />
        {nav.showBackdrop && (
          <button
            type="button"
            className="nav-backdrop"
            aria-label="Close navigation"
            tabIndex={-1}
            onClick={nav.close}
          />
        )}
        <main id="main-content" className="main-content">
          <Outlet />
        </main>
        {/* New pages start at the top; back/forward restores the previous position. */}
        <ScrollRestoration />
      </div>
    </div>
  )
}
