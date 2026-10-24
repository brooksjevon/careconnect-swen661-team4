import { NavLink } from "react-router-dom"
import { icons } from "@/constants/icons"
import { useSession } from "@/hooks/useSession"
import { getNavItemsForRole } from "@/navigation/navItems"
import { prefetchRoute } from "@/routes/lazyPages"
import { Icon } from "@/components/ui/Icon"

type SidebarProps = {
  open: boolean
  onToggle: () => void
  onNavigate: () => void
}

function SignOutIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="M16 17l5-5-5-5" />
      <path d="M21 12H9" />
    </svg>
  )
}

/**
 * Main navigation. Its form depends on screen size (see index.css):
 * full sidebar on desktop, icon rail on tablet, off-canvas drawer on mobile.
 * Labels stay in the DOM (visually hidden in the rail) so links keep their accessible names.
 */
export function Sidebar({ open, onToggle, onNavigate }: SidebarProps) {
  const { role, signOut } = useSession()
  const items = getNavItemsForRole(role)

  return (
    <aside id="app-navigation" className={`sidebar${open ? " sidebar--open" : ""}`}>
      <button
        className="sidebar__toggle"
        type="button"
        aria-label={open ? "Collapse navigation" : "Expand navigation"}
        aria-controls="app-navigation"
        aria-expanded={open}
        onClick={onToggle}
      >
        <Icon src={icons.panel} size={20} />
      </button>

      <nav className="sidebar__nav" aria-label="CareConnect">
        {items.map((item) => (
          <NavLink
            className={({ isActive }) => `sidebar__link${isActive ? " is-active" : ""}`}
            key={item.to}
            to={item.to}
            title={item.label}
            onClick={onNavigate}
            onPointerEnter={() => prefetchRoute(item.to)}
            onFocus={() => prefetchRoute(item.to)}
          >
            <Icon src={item.icon} size={20} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <button type="button" className="signout-button" title="Sign out" onClick={signOut}>
        <SignOutIcon />
        <span>Sign out</span>
      </button>
    </aside>
  )
}
