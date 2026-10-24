import type { FormEvent, Ref } from "react"
import { Button } from "@/components/ui/Button"
import { TextField } from "@/components/ui/TextField"
import type { EditableField } from "@/hooks/useAppointmentEditor"
import type { Appointment } from "@/store"

const FIELDS: { key: EditableField; label: string; type: string; required?: boolean }[] = [
  { key: "title", label: "Appointment title", type: "text", required: true },
  { key: "date", label: "Date", type: "date", required: true },
  { key: "time", label: "Time", type: "time", required: true },
  { key: "location", label: "Location", type: "text" },
  { key: "caregiver", label: "Caregiver", type: "text" },
]

type AppointmentEditorProps = {
  draft: Appointment
  isEditing: boolean
  message: string
  onFieldChange: (field: EditableField, value: string) => void
  onSubmit: (event: FormEvent) => void
  ref?: Ref<HTMLFormElement>
}

/** Create / edit form for a single appointment. State lives in useAppointmentEditor. */
export function AppointmentEditor({ draft, isEditing, message, onFieldChange, onSubmit, ref }: AppointmentEditorProps) {
  return (
    <form className="editor-card" onSubmit={onSubmit} ref={ref} aria-labelledby="appointment-editor-title">
      <p className="eyebrow">{isEditing ? "Edit appointment" : "New appointment"}</p>
      <h2 id="appointment-editor-title">{isEditing ? draft.title : "Appointment details"}</h2>

      {FIELDS.map(({ key, label, type, required }) => (
        <TextField
          key={key}
          label={label}
          type={type}
          required={required}
          value={draft[key]}
          onChange={(event) => onFieldChange(key, event.target.value)}
        />
      ))}

      {message && (
        <p role="status" className="save-message">
          {message}
        </p>
      )}
      <Button type="submit" full>
        Save appointment
      </Button>
    </form>
  )
}
