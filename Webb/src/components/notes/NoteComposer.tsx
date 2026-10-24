import { useState, type FormEvent } from "react"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { SelectField } from "@/components/ui/SelectField"
import { TextAreaField } from "@/components/ui/TextAreaField"
import type { NotePriority } from "@/store"

const PRIORITIES: readonly NotePriority[] = ["Routine", "Urgent"]

type NoteComposerProps = {
  onSubmit: (text: string, priority: NotePriority) => void
}

/** Caregiver form for sharing a new care note. */
export function NoteComposer({ onSubmit }: NoteComposerProps) {
  const [text, setText] = useState("")
  const [priority, setPriority] = useState<NotePriority>("Routine")
  const [error, setError] = useState("")

  const submit = (event: FormEvent) => {
    event.preventDefault()
    if (!text.trim()) {
      setError("Please enter a note.")
      return
    }
    onSubmit(text, priority)
    setText("")
    setError("")
  }

  return (
    <Card className="note-composer">
      <div>
        <span className="eyebrow">New note</span>
        <h2>Share an update with the care team</h2>
      </div>
      <form onSubmit={submit} className="note-form">
        <TextAreaField
          label="Note"
          value={text}
          onChange={(event) => setText(event.target.value)}
          maxLength={2000}
          rows={3}
          required
        />
        <div className="note-form__footer">
          <SelectField
            className="note-form__priority"
            label="Priority"
            value={priority}
            options={PRIORITIES}
            onChange={setPriority}
          />
          {error && (
            <p role="alert" className="form-error">
              {error}
            </p>
          )}
          <Button type="submit">Add note</Button>
        </div>
      </form>
    </Card>
  )
}
