import { useCallback, useEffect } from "react"

const isSupported = () => typeof window !== "undefined" && "speechSynthesis" in window

/**
 * Reads the text content of the first element matching `selector` aloud
 * using the browser's speech synthesis. Speech stops when the component unmounts.
 */
export function useSpeechReader(selector: string, rate = 0.92) {
  const stop = useCallback(() => {
    if (isSupported()) window.speechSynthesis.cancel()
  }, [])

  const read = useCallback(() => {
    if (!isSupported()) return
    stop()
    const text = document.querySelector(selector)?.textContent?.replace(/\s+/g, " ").trim()
    if (!text) return
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = rate
    window.speechSynthesis.speak(utterance)
  }, [selector, rate, stop])

  useEffect(() => stop, [stop])

  return { read, stop, supported: isSupported() }
}
