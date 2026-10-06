import {
  DEFAULT_SETTINGS,
  mergeSettings,
  nextFontSize,
  isValidTheme
} from '../settings'

describe('settings business logic', () => {
  test('uses CareConnect defaults', () => {
    expect(DEFAULT_SETTINGS).toEqual({
      fontSize: 'medium',
      mode: 'light',
      theme: 'ocean'
    })
  })

  test('merges saved settings with defaults', () => {
    expect(mergeSettings({ mode: 'dark' })).toEqual({
      fontSize: 'medium',
      mode: 'dark',
      theme: 'ocean'
    })
  })

  test('increases and decreases font size', () => {
    expect(nextFontSize('medium', 1)).toBe('large')
    expect(nextFontSize('large', -1)).toBe('medium')
  })

  test('does not exceed font size limits', () => {
    expect(nextFontSize('small', -1)).toBe('small')
    expect(nextFontSize('xlarge', 1)).toBe('xlarge')
  })

  test.each(['ocean', 'emerald', 'violet', 'warm'])(
    'accepts the %s theme',
    theme => expect(isValidTheme(theme)).toBe(true)
  )

  test('rejects an unknown theme', () => {
    expect(isValidTheme('unknown')).toBe(false)
  })
})
