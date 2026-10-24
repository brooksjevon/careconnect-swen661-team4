import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import PatientHome from '../patient/PatientHome'
import Medications from '../patient/Medications'
import Appointments from '../patient/Appointments'
import Contacts from '../patient/Contacts'
import Memories from '../patient/Memories'
import Schedule from '../patient/Schedule'
import Today from '../patient/Today'

jest.mock('../../layouts/AppLayout', () => ({
  __esModule: true,
  default: ({ children }) => <main>{children}</main>
}))

const renderPage = ui => render(<MemoryRouter future={{v7_startTransition:true,v7_relativeSplatPath:true}}>{ui}</MemoryRouter>)

describe('Patient pages', () => {
  test('PatientHome renders daily summary, next tasks and quick links', () => {
    renderPage(<PatientHome />)
    expect(screen.getByRole('heading',{name:/good morning, margaret/i})).toBeInTheDocument()
    expect(screen.getByText('2 / 6')).toBeInTheDocument()
    expect(screen.getByText('Breakfast')).toBeInTheDocument()
    expect(screen.getByRole('link',{name:'Medicines'})).toHaveAttribute('href','/patient/medications')
    expect(screen.getByRole('link',{name:'Contacts'})).toHaveAttribute('href','/patient/contacts')
  })

  test('Medications renders medicine tracker data', () => {
    renderPage(<Medications />)
    expect(screen.getByRole('heading',{name:'Medicines'})).toBeInTheDocument()
    expect(screen.getByText(/2 medicines still to take today/i)).toBeInTheDocument()
    expect(screen.getByRole('heading',{name:'Memantine'})).toBeInTheDocument()
    expect(screen.getByRole('heading',{name:'Amlodipine'})).toBeInTheDocument()
  })

  test('Appointments renders today and later appointments', () => {
    renderPage(<Appointments />)
    expect(screen.getByRole('heading',{name:'My Appointments'})).toBeInTheDocument()
    expect(screen.getByText('Vision Plus Opticians')).toBeInTheDocument()
    expect(screen.getAllByRole('button',{name:'Get directions'}).length).toBeGreaterThan(0)
  })
})

// Coverage for the remaining patient-facing pages. These assertions verify the
// content and navigation that a patient relies on rather than only mounting the
// components.
describe('Additional patient pages', () => {
  test('Contacts renders emergency and support contacts with call actions', () => {
    renderPage(<Contacts />)
    expect(screen.getByRole('heading', { name: 'Contacts' })).toBeInTheDocument()
    expect(screen.getAllByRole('heading', { name: /Dr\. Anita Sharma/i })).toHaveLength(2)
    expect(screen.getByRole('heading', { name: /Emergency services/i })).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: /07700 900 123/i })).toHaveLength(2)
    expect(screen.getByText('Joyce Adeyemi')).toBeInTheDocument()
    expect(screen.getByText('Maria Thompson')).toBeInTheDocument()
    expect(screen.getAllByText('Family')).toHaveLength(2)
  })

  test('Memories renders filters and all pinned memory cards', () => {
    renderPage(<Memories />)
    expect(screen.getByRole('heading', { name: 'Memories' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'All' })).toHaveClass('selected')
    expect(screen.getByRole('button', { name: 'Family' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Places' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Memories' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Hobbies' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Pets' })).toBeInTheDocument()
    expect(screen.getByText('Ellen')).toBeInTheDocument()
    expect(screen.getByText('Sunday roast')).toBeInTheDocument()
    expect(screen.getByText('Blackpool 1962')).toBeInTheDocument()
    expect(screen.getByText('My garden')).toBeInTheDocument()
    expect(screen.getByText('Belle the cat')).toBeInTheDocument()
  })

  test('Schedule renders progress plus completed and upcoming task types', () => {
    renderPage(<Schedule />)
    expect(screen.getByRole('heading', { name: 'My Day' })).toBeInTheDocument()
    expect(screen.getByText('3 of 6 tasks complete')).toBeInTheDocument()
    expect(screen.getByText('50%')).toBeInTheDocument()
    expect(screen.getByText('Morning tablets')).toHaveClass('strike')
    expect(screen.getByText('Medicine')).toBeInTheDocument()
    expect(screen.getAllByText('Meal')).toHaveLength(2)
    expect(screen.getByText('Activity')).toBeInTheDocument()
    expect(screen.getByText('Rest')).toBeInTheDocument()
    expect(screen.getByText('Appointment')).toBeInTheDocument()
    expect(screen.getByText('✓')).toHaveClass('done')
  })

  test('Today renders next action, later tasks and patient quick-action routes', () => {
    renderPage(<Today />)
    expect(screen.getByRole('heading', { name: /Here's your day, Margaret/i })).toBeInTheDocument()
    expect(screen.getByText(/Morning tablets/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Mark as taken/i })).toBeInTheDocument()
    expect(screen.getByText('Breakfast')).toBeInTheDocument()
    expect(screen.getByText('Morning walk')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Medications' })).toHaveAttribute('href', '/patient/medications')
    expect(screen.getByRole('link', { name: 'Appointments' })).toHaveAttribute('href', '/patient/appointments')
    expect(screen.getByRole('link', { name: 'Check In' })).toHaveAttribute('href', '/patient/home')
    expect(screen.getByRole('link', { name: 'Call Caregiver' })).toHaveAttribute('href', '/patient/contacts')
  })
})
