import type { RootState } from "./index"

export const selectSignedIn = (state: RootState) => state.care.signedIn
export const selectRole = (state: RootState) => state.care.role
export const selectAppointments = (state: RootState) => state.care.appointments
export const selectNotes = (state: RootState) => state.care.notes
export const selectActivities = (state: RootState) => state.care.activities
