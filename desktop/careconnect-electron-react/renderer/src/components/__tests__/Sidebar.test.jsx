import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Sidebar from '../Sidebar'

function renderSidebar(role, route) {
  return render(
    <MemoryRouter
      initialEntries={[route]}
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Sidebar role={role} />
    </MemoryRouter>
  )
}

describe('Sidebar', () => {
  test('renders patient navigation and Settings', () => {
    renderSidebar('patient', '/patient/medications')
    expect(screen.getByRole('navigation', { name: /main navigation/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /medications/i })).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('link', { name: /settings/i })).toBeInTheDocument()
  })

  test('renders caregiver navigation', () => {
    renderSidebar('caregiver', '/caregiver/notes')
    expect(screen.getByRole('link', { name: /manage medications/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /notes/i })).toHaveAttribute('aria-current', 'page')
  })
})
