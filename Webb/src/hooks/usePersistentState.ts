import { useEffect, useState } from "react"

/**
 * useState that is saved to localStorage under `key` and restored on load.
 * Pass `isValid` to reject stale or tampered values (they fall back to `initial`).
 * Storage errors (private mode, quota) are ignored — the state still works in memory.
 */
export function usePersistentState<T extends string | boolean>(
  key: string,
  initial: T,
  isValid: (value: unknown) => value is T = (value): value is T => typeof value === typeof initial,
) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key)
      if (raw === null) return initial
      const parsed: unknown = typeof initial === "boolean" ? raw === "true" : raw
      return isValid(parsed) ? parsed : initial
    } catch {
      return initial
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, String(value))
    } catch {
      // Ignore: storage unavailable.
    }
  }, [key, value])

  return [value, setValue] as const
}
