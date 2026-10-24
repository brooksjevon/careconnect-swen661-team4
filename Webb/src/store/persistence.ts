import { seedState } from "./seed"
import type { CareState, PersistedCareData } from "./types"

const STORAGE_KEY = "careconnect-data-v2"

/**
 * Initial state: seed data merged with anything saved on this device.
 * The session (signed in / role) is never restored, so every visit starts signed out.
 */
export function loadCareState(): CareState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const saved = JSON.parse(raw) as Partial<PersistedCareData>
      return { ...seedState, ...saved, signedIn: false, role: null }
    }
  } catch {
    // Private browsing, blocked storage, or invalid saved data — fall back to the seed.
  }
  return seedState
}

export function saveCareData({ appointments, notes, activities }: PersistedCareData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ appointments, notes, activities }))
  } catch {
    // Storage may be full or unavailable; the app keeps working in memory.
  }
}
