import { useEffect, useMemo, type ReactNode } from "react"
import { usePersistentState } from "@/hooks/usePersistentState"
import { useSpeechReader } from "@/hooks/useSpeechReader"
import { isTextSize, isTheme, PreferencesContext, type Preferences, type TextSize, type Theme } from "./preferencesContext"

/** Page content that "Listen to this page" reads aloud. */
const READABLE_CONTENT = ".main-content, .role-layout, .signin-layout, .about-page"

/** Accessibility preferences (text size, theme, voice reading), saved on this device. */
export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [textSize, setTextSize] = usePersistentState<TextSize>("careconnect-text-size", "standard", isTextSize)
  const [theme, setTheme] = usePersistentState<Theme>("careconnect-theme", "light", isTheme)
  const [voiceEnabled, setVoiceEnabled] = usePersistentState<boolean>("careconnect-voice", false)
  const { read, stop } = useSpeechReader(READABLE_CONTENT)

  // index.css styles the whole app from these <html> data attributes.
  useEffect(() => {
    document.documentElement.dataset.textSize = textSize
  }, [textSize])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  useEffect(() => {
    if (!voiceEnabled) stop()
  }, [voiceEnabled, stop])

  const value = useMemo<Preferences>(
    () => ({
      textSize,
      theme,
      voiceEnabled,
      setTextSize,
      setTheme,
      setVoiceEnabled,
      readPage: read,
      stopReading: stop,
    }),
    [textSize, theme, voiceEnabled, setTextSize, setTheme, setVoiceEnabled, read, stop],
  )

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>
}
