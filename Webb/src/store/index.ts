import { configureStore } from "@reduxjs/toolkit"
import { useDispatch, useSelector } from "react-redux"
import { careReducer } from "./careSlice"
import { saveCareData } from "./persistence"

export const store = configureStore({ reducer: { care: careReducer } })

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

/** Typed versions of the react-redux hooks — use these instead of the plain ones. */
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()

// Save care data (not the session) whenever it changes.
let lastSaved = store.getState().care
store.subscribe(() => {
  const care = store.getState().care
  const changed =
    care.appointments !== lastSaved.appointments ||
    care.notes !== lastSaved.notes ||
    care.activities !== lastSaved.activities
  lastSaved = care
  if (changed) saveCareData(care)
})

export { actions } from "./careSlice"
export * from "./selectors"
export type * from "./types"
