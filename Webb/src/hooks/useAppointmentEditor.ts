import { useState, type FormEvent } from "react"
import type { Appointment } from "@/store"
import { useAppointments } from "./useCareData"

export type EditableField = Exclude<keyof Appointment, "id">

export const BLANK_APPOINTMENT: Appointment = {
  id: "",
  title: "",
  date: "",
  time: "",
  location: "",
  caregiver: "",
}

/** Form state, validation and save/delete actions for the appointment editor. */
export function useAppointmentEditor() {
  const { appointments, saveAppointment, removeAppointment } = useAppointments()
  const [draft, setDraft] = useState<Appointment>(BLANK_APPOINTMENT)
  const [message, setMessage] = useState("")

  const isEditing = draft.id !== ""

  const updateField = (field: EditableField, value: string) =>
    setDraft((current) => ({ ...current, [field]: value }))

  const startNew = () => {
    setDraft(BLANK_APPOINTMENT)
    setMessage("")
  }

  const startEdit = (appointment: Appointment) => {
    setDraft(appointment)
    setMessage("")
  }

  const remove = (appointment: Appointment) => {
    if (!window.confirm(`Delete ${appointment.title}?`)) return
    removeAppointment(appointment.id)
    if (draft.id === appointment.id) setDraft(BLANK_APPOINTMENT)
    setMessage("Appointment deleted.")
  }

  const submit = (event: FormEvent) => {
    event.preventDefault()
    if (!draft.title.trim() || !draft.date || !draft.time) {
      setMessage("Title, date, and time are required.")
      return
    }
    saveAppointment(draft)
    setMessage("Appointment saved on this device.")
    setDraft(BLANK_APPOINTMENT)
  }

  return { appointments, draft, isEditing, message, updateField, startNew, startEdit, remove, submit }
}
