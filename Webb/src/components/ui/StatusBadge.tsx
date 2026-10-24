import type { ReactNode } from "react"

export type StatusTone = "blue" | "green" | "red"

type StatusBadgeProps = {
  tone: StatusTone
  children: ReactNode
}

/** Small rounded label, e.g. "Done", "Urgent", "Next appointment". */
export function StatusBadge({ tone, children }: StatusBadgeProps) {
  return <span className={`status status--${tone}`}>{children}</span>
}
