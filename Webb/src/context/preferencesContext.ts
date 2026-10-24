import { createContext } from "react"

export const TEXT_SIZES = ["standard", "large", "extra-large"] as const
export const THEMES = ["light", "dark", "calm"] as const

export type TextSize = (typeof TEXT_SIZES)[number]
export type Theme = (typeof THEMES)[number]

export const isTextSize = (value: unknown): value is TextSize => TEXT_SIZES.includes(value as TextSize)
export const isTheme = (value: unknown): value is Theme => THEMES.includes(value as Theme)

export type Preferences = {
  textSize: TextSize
  theme: Theme
  voiceEnabled: boolean
  setTextSize: (value: TextSize) => void
  setTheme: (value: Theme) => void
  setVoiceEnabled: (value: boolean) => void
  readPage: () => void
  stopReading: () => void
}

export const PreferencesContext = createContext<Preferences | null>(null)
