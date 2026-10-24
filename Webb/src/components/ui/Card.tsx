import type { ReactNode } from "react"

export type CardTone = "white" | "blue" | "green" | "red" | "amber"

type CardProps = {
  children: ReactNode
  tone?: CardTone
  className?: string
}

export function Card({ children, tone = "white", className = "" }: CardProps) {
  return <section className={`card card--${tone} ${className}`}>{children}</section>
}
