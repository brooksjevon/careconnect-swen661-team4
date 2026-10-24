import type { CardTone } from "@/components/ui/Card"

export type Contact = {
  category: string
  name: string
  phone: string
  tone: CardTone
}

export const contacts: Contact[] = [
  { category: "Emergency", name: "Joyce Miller", phone: "07700 900 123", tone: "red" },
  { category: "Emergency", name: "Emergency services", phone: "999", tone: "red" },
  { category: "Carer", name: "Maria Thompson", phone: "07700 900 456", tone: "blue" },
  { category: "Family", name: "David Miller", phone: "07700 900 789", tone: "green" },
  { category: "Doctor", name: "Greenfield Surgery", phone: "07700 900 123", tone: "blue" },
  { category: "Family", name: "Helen Walker", phone: "07700 900 321", tone: "green" },
]

/** Strips spaces so the number works in a tel: link. */
export const toTelHref = (phone: string) => `tel:${phone.replace(/\s+/g, "")}`
