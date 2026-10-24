import { Card } from "@/components/ui/Card"
import { StatusBadge } from "@/components/ui/StatusBadge"
import type { Note } from "@/store"

export function NoteCard({ note }: { note: Note }) {
  const urgent = note.priority === "Urgent"

  return (
    <Card tone={urgent ? "red" : "white"}>
      <div className="note-meta">
        <span>{note.date}</span>
        <StatusBadge tone={urgent ? "red" : "blue"}>{note.priority}</StatusBadge>
      </div>
      <p className="note-copy">{note.copy}</p>
      <strong>{note.author}</strong>
    </Card>
  )
}
