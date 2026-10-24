import { NavLink } from "react-router-dom"
import { icons } from "@/constants/icons"
import { usePreferences } from "@/hooks/usePreferences"
import { useSession } from "@/hooks/useSession"
import { PATHS } from "@/routes/paths"
import { Icon } from "@/components/ui/Icon"

type BrandHeaderProps = {
  authenticated?: boolean
  /** Whether the mobile navigation drawer is open (for aria-expanded). */
  navOpen?: boolean
  onMenuClick?: () => void
}

export function BrandHeader({ authenticated = false, navOpen = false, onMenuClick }: BrandHeaderProps) {
  const { voiceEnabled, readPage } = usePreferences()
  const { role } = useSession()

  return (
    <header className="brand-header">
      {authenticated && (
        <button
          className="mobile-menu-button"
          type="button"
          aria-label={navOpen ? "Close navigation" : "Open navigation"}
          aria-controls="app-navigation"
          aria-expanded={navOpen}
          onClick={onMenuClick}
        >
          <Icon src={icons.menu} size={24} />
        </button>
      )}

      <NavLink className="brand" to={authenticated ? PATHS.dashboard : PATHS.home} aria-label="CareConnect home">
        <Icon src={icons.logo} size={24} />
        <span>CareConnect</span>
      </NavLink>

      {authenticated ? (
        <>
          <span className="brand-header__account">
            {role === "caregiver" ? "Caregiver · Joyce" : "Care recipient · Margaret"}
          </span>
          {voiceEnabled && (
            <button className="listen-button" type="button" onClick={readPage}>
              Listen<span className="listen-button__extra"> to this page</span>
            </button>
          )}
        </>
      ) : (
        <nav className="public-nav" aria-label="Public navigation">
          <NavLink to={PATHS.about}>About</NavLink>
          <NavLink to={PATHS.signIn}>Sign in</NavLink>
        </nav>
      )}
    </header>
  )
}
