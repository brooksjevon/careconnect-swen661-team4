import { useCallback } from "react"
import {
  actions,
  selectActivities,
  selectAppointments,
  selectNotes,
  useAppDispatch,
  useAppSelector,
  type ActivityType,
  type Appointment,
  type NotePriority,
} from "@/store"

/**
 * Domain hooks: pages and components use these instead of talking to Redux
 * directly, so selectors, action shapes and ids live in one place.
 */

export function useAppointments() {
  const appointments = useAppSelector(selectAppointments)
  const dispatch = useAppDispatch()

  /** Creates the appointment (new id) or updates it (existing id). */
  const saveAppointment = useCallback(
    (appointment: Appointment) =>
      dispatch(
        actions.saveAppointment({
          ...appointment,
          id: appointment.id || crypto.randomUUID(),
          title: appointment.title.trim(),
        }),
      ),
    [dispatch],
  )

  const removeAppointment = useCallback((id: string) => dispatch(actions.removeAppointment(id)), [dispatch])

  return { appointments, saveAppointment, removeAppointment }
}

export function useNotes() {
  const notes = useAppSelector(selectNotes)
  const dispatch = useAppDispatch()

  const addNote = useCallback(
    (text: string, priority: NotePriority, author: string) =>
      dispatch(
        actions.addNote({
          id: crypto.randomUUID(),
          date: new Date().toLocaleString(),
          priority,
          copy: text.trim(),
          author,
        }),
      ),
    [dispatch],
  )

  return { notes, addNote }
}

export const ALL_ACTIVITY = "All activity"
export type ActivityFilter = ActivityType | typeof ALL_ACTIVITY
export const ACTIVITY_FILTERS: ActivityFilter[] = [ALL_ACTIVITY, "Medicines", "Check-ins", "Tasks"]

export function useActivityLog(filter: ActivityFilter) {
  const activities = useAppSelector(selectActivities)
  return filter === ALL_ACTIVITY ? activities : activities.filter((event) => event.type === filter)
}
