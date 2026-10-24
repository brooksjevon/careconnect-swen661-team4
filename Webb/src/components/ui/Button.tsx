import type { ReactNode } from "react"
import { NavLink } from "react-router-dom"

type ButtonKind = "primary" | "secondary" | "quiet"

type ButtonProps = {
  children: ReactNode
  /** Internal route: renders a router link styled as a button. */
  to?: string
  /** External or protocol link (tel:, https:): renders a plain anchor styled as a button. */
  href?: string
  /** With `href`: open in a new tab (adds rel="noopener noreferrer"). */
  external?: boolean
  kind?: ButtonKind
  type?: "button" | "submit"
  onClick?: () => void
  full?: boolean
  /** For toggle buttons: sets aria-pressed. */
  pressed?: boolean
  className?: string
}

export function Button({
  children,
  to,
  href,
  external = false,
  kind = "primary",
  type = "button",
  onClick,
  full = false,
  pressed,
  className = "",
}: ButtonProps) {
  const classes = ["button", `button--${kind}`, full && "button--full", className].filter(Boolean).join(" ")

  if (to) {
    return (
      <NavLink className={classes} to={to}>
        {children}
      </NavLink>
    )
  }

  if (href) {
    return (
      <a
        className={classes}
        href={href}
        onClick={onClick}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
        {external && <span className="visually-hidden"> (opens in a new tab)</span>}
      </a>
    )
  }

  return (
    <button className={classes} onClick={onClick} type={type} aria-pressed={pressed}>
      {children}
    </button>
  )
}
