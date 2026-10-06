import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SettingsProvider, useSettings } from '../SettingsProvider'

function Consumer() {
  const { settings, update, reset } = useSettings()
  return (
    <>
      <output>{settings.mode}-{settings.fontSize}-{settings.theme}</output>
      <button onClick={() => update('mode', 'dark')}>Dark</button>
      <button onClick={reset}>Reset</button>
    </>
  )
}

describe('SettingsProvider', () => {
  beforeEach(() => localStorage.clear())

  test('loads defaults and persists changes', async () => {
    const user = userEvent.setup()
    render(<SettingsProvider><Consumer /></SettingsProvider>)
    expect(screen.getByText('light-medium-ocean')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Dark' }))
    expect(screen.getByText('dark-medium-ocean')).toBeInTheDocument()
    expect(JSON.parse(localStorage.getItem('careconnect.settings')).mode).toBe('dark')
    expect(document.documentElement.dataset.mode).toBe('dark')
  })

  test('resets settings', async () => {
    localStorage.setItem('careconnect.settings', JSON.stringify({ mode: 'dark', theme: 'warm' }))
    const user = userEvent.setup()
    render(<SettingsProvider><Consumer /></SettingsProvider>)
    expect(screen.getByText('dark-medium-warm')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Reset' }))
    expect(screen.getByText('light-medium-ocean')).toBeInTheDocument()
  })
})
