import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { toTelHref, type Contact } from "@/data/contacts"

export function ContactCard({ contact }: { contact: Contact }) {
  const { category, name, phone, tone } = contact
  const tel = toTelHref(phone)

  return (
    <Card tone={tone}>
      <span className="eyebrow">{category}</span>
      <h2>{name}</h2>
      <a className="phone-number" href={tel}>
        {phone}
      </a>
      <Button kind="secondary" href={tel}>
        Call now<span className="visually-hidden"> {name}</span>
      </Button>
    </Card>
  )
}
