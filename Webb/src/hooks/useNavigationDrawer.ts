import { useCallback, useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { BREAKPOINTS, useMediaQuery } from "./useMediaQuery"

const MENU_BUTTON = ".mobile-menu-button"
const RAIL_TOGGLE = ".sidebar__toggle"
const FIRST_NAV_LINK = "#app-navigation .sidebar__link"

/**
 * Open/close state and behaviour for the app navigation on tablet and mobile.
 * - Closes after navigating, and when the screen grows to desktop size.
 * - Escape closes it and returns focus to the button that opened it.
 * - On mobile, locks page scroll and moves focus into the drawer while open.
 */
export function useNavigationDrawer() {
  const [open, setOpen] = useState(false)
  const isMobile = useMediaQuery(BREAKPOINTS.mobile)
  const isDesktop = useMediaQuery(BREAKPOINTS.desktop)
  const { pathname } = useLocation()

  const toggle = useCallback(() => setOpen((value) => !value), [])
  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    setOpen(false)
  }, [pathname, isDesktop])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return
      setOpen(false)
      document.querySelector<HTMLElement>(isMobile ? MENU_BUTTON : RAIL_TOGGLE)?.focus()
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [open, isMobile])

  useEffect(() => {
    if (!open || !isMobile) return
    document.body.classList.add("nav-locked")
    document.querySelector<HTMLElement>(FIRST_NAV_LINK)?.focus()
    return () => document.body.classList.remove("nav-locked")
  }, [open, isMobile])

  return { open, toggle, close, showBackdrop: open && !isDesktop }
}
