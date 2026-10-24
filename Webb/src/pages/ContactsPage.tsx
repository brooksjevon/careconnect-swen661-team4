import { ContactCard } from "@/components/contacts/ContactCard"
import { ShareContactsCard } from "@/components/contacts/ShareContactsCard"
import { PageHeading } from "@/components/ui/PageHeading"
import { contacts } from "@/data/contacts"

export function ContactsPage() {
  return (
    <>
      <PageHeading title="Contacts" subtitle="People who are here to help you" />
      <div className="contact-grid">
        {contacts.map((contact) => (
          <ContactCard key={`${contact.name}-${contact.phone}`} contact={contact} />
        ))}
      </div>
      <ShareContactsCard contacts={contacts} />
    </>
  )
}
