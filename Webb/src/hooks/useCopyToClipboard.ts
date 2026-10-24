import { useCallback, useEffect, useRef, useState } from "react"

/**
 * Copies text to the clipboard and exposes a `copied` flag that resets
 * after `resetAfterMs`, so a "Copied" label can be shown briefly.
 */
export function useCopyToClipboard(resetAfterMs = 3000) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const copy = useCallback(
    async (text: string) => {
      window.clearTimeout(timer.current)
      try {
        await navigator.clipboard.writeText(text)
        setCopied(true)
        timer.current = window.setTimeout(() => setCopied(false), resetAfterMs)
        return true
      } catch {
        setCopied(false)
        return false
      }
    },
    [resetAfterMs],
  )

  return { copied, copy }
}
