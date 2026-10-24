import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { icons } from "@/constants/icons"
import type { Contact } from "@/data/contacts"
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard"
import { Icon } from "@/components/ui/Icon"

/** Copies every contact's name and number so they can be shared with a helper. */
export function ShareContactsCard({ contacts }: { contacts: Contact[] }) {
  const { copied, copy } = useCopyToClipboard()
  const copyAll = () => copy(contacts.map(({ name, phone }) => `${name}: ${phone}`).join("\n"))

  return (
    <Card tone="blue" className="handoff">
      <Icon src={icons.contacts} size={28} lazy />
      <div>
        <h2>Using another phone?</h2>
        <p>Share these numbers with the person helping you today.</p>
      </div>
      <Button kind="secondary" onClick={copyAll}>
        <span aria-live="polite">{copied ? "Numbers copied" : "Copy all numbers"}</span>
      </Button>
    </Card>
  )
}
