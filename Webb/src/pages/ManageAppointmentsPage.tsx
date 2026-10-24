import { useRef } from "react"
import { AppointmentEditor } from "@/components/appointments/AppointmentEditor"
import { AppointmentListItem } from "@/components/appointments/AppointmentListItem"
import { Button } from "@/components/ui/Button"
import { PageHeading } from "@/components/ui/PageHeading"
import { useAppointmentEditor } from "@/hooks/useAppointmentEditor"
import { BREAKPOINTS, useMediaQuery } from "@/hooks/useMediaQuery"
import type { Appointment } from "@/store"

export function ManageAppointmentsPage() {
  const editor = useAppointmentEditor()
  const formRef = useRef<HTMLFormElement>(null)
  // Below desktop the editor sits under the list, so bring it into view when editing starts.
  const editorBelowList = !useMediaQuery(BREAKPOINTS.desktop)

  const revealEditor = () => {
    if (!editorBelowList) return
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    requestAnimationFrame(() => {
      formRef.current?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" })
      formRef.current?.querySelector("input")?.focus({ preventScroll: true })
    })
  }

  const handleEdit = (appointment: Appointment) => {
    editor.startEdit(appointment)
    revealEditor()
  }

  const handleAdd = () => {
    editor.startNew()
    revealEditor()
  }

  return (
    <>
      <PageHeading title="Manage appointments" subtitle="Add, edit, or remove Margaret’s appointments" />

      <div className="manage-layout">
        <section aria-labelledby="scheduled-title">
          <div className="section-title">
            <h2 id="scheduled-title">Scheduled ({editor.appointments.length})</h2>
            <Button onClick={handleAdd}>+ Add appointment</Button>
          </div>
          <div className="manage-list">
            {editor.appointments.map((appointment) => (
              <AppointmentListItem
                key={appointment.id}
                appointment={appointment}
                onEdit={handleEdit}
                onDelete={editor.remove}
              />
            ))}
          </div>
        </section>

        <AppointmentEditor
          ref={formRef}
          draft={editor.draft}
          isEditing={editor.isEditing}
          message={editor.message}
          onFieldChange={editor.updateField}
          onSubmit={editor.submit}
        />
      </div>
    </>
  )
}
