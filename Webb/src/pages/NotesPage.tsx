import { lazy, Suspense } from "react"
import { NoteCard } from "@/components/notes/NoteCard"
import { PageHeading } from "@/components/ui/PageHeading"
import { useNotes } from "@/hooks/useCareData"
import { useSession } from "@/hooks/useSession"
import type { NotePriority } from "@/store"

const CAREGIVER_NAME = "Joyce Miller"

// Only caregivers can write notes, so care recipients never download the composer.
const NoteComposer = lazy(() => import("@/components/notes/NoteComposer").then((m) => ({ default: m.NoteComposer })))

/** Same footprint as the composer, so nothing shifts when it arrives. */
function NoteComposerPlaceholder() {
  return <div className="card note-composer note-composer--loading" aria-hidden="true" />
}

export function NotesPage() {
  const { role } = useSession()
  const { notes, addNote } = useNotes()
  const isCaregiver = role === "caregiver"

  const handleSubmit = (text: string, priority: NotePriority) => addNote(text, priority, CAREGIVER_NAME)

  return (
    <>
      <PageHeading
        title="Caregiver notes"
        subtitle={
          isCaregiver
            ? "Share daily observations with Margaret’s care team"
            : "Updates shared by the people supporting you"
        }
      />

      {isCaregiver && (
        <Suspense fallback={<NoteComposerPlaceholder />}>
          <NoteComposer onSubmit={handleSubmit} />
        </Suspense>
      )}

      <div className="note-grid">
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>
    </>
  )
}
