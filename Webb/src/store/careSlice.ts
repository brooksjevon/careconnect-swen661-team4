import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { loadCareState } from "./persistence"
import type { Activity, Appointment, Note, Role } from "./types"

const careSlice = createSlice({
  name: "care",
  initialState: loadCareState,
  reducers: {
    signIn(state) {
      state.signedIn = true
      state.role = null
    },
    signOut(state) {
      state.signedIn = false
      state.role = null
    },
    chooseRole(state, action: PayloadAction<Role>) {
      state.role = action.payload
    },
    /** Adds the appointment, or replaces the one with the same id. */
    saveAppointment(state, action: PayloadAction<Appointment>) {
      const index = state.appointments.findIndex((a) => a.id === action.payload.id)
      if (index >= 0) state.appointments[index] = action.payload
      else state.appointments.push(action.payload)
    },
    removeAppointment(state, action: PayloadAction<string>) {
      state.appointments = state.appointments.filter((a) => a.id !== action.payload)
    },
    addNote(state, action: PayloadAction<Note>) {
      state.notes.unshift(action.payload)
    },
    logActivity(state, action: PayloadAction<Activity>) {
      state.activities.unshift(action.payload)
    },
  },
})

export const actions = careSlice.actions
export const careReducer = careSlice.reducer
