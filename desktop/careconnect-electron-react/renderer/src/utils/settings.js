export const DEFAULT_SETTINGS = {
  fontSize: 'medium',
  mode: 'light',
  theme: 'ocean'
}

export const FONT_SIZES = ['small', 'medium', 'large', 'xlarge']

export function mergeSettings(saved = {}) {
  return { ...DEFAULT_SETTINGS, ...saved }
}

export function nextFontSize(current, direction) {
  const index = FONT_SIZES.indexOf(current)
  const safeIndex = index < 0 ? 1 : index
  const next = Math.max(0, Math.min(FONT_SIZES.length - 1, safeIndex + direction))
  return FONT_SIZES[next]
}

export function isValidTheme(theme) {
  return ['ocean', 'emerald', 'violet', 'warm'].includes(theme)
}
