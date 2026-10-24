import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import CaregiverDashboard from '../caregiver/CaregiverDashboard'
import ManageMedications from '../caregiver/ManageMedications'
import ManageAppointments from '../caregiver/ManageAppointments'
import ActivityLog from '../caregiver/ActivityLog'
import Notes from '../caregiver/Notes'

jest.mock('../../layouts/AppLayout', () => ({__esModule:true,default:({children})=><main>{children}</main>}))
const renderPage=ui=>render(<MemoryRouter future={{v7_startTransition:true,v7_relativeSplatPath:true}}>{ui}</MemoryRouter>)

describe('Caregiver pages',()=>{
 test('Dashboard renders status, alerts, activity and all quick links',()=>{
  renderPage(<CaregiverDashboard/>); expect(screen.getByRole('heading',{name:'Dashboard'})).toBeInTheDocument(); expect(screen.getByText(/Amlodipine — overdue/i)).toBeInTheDocument(); expect(screen.getByText('Vision Plus Opticians')).toBeInTheDocument()
  expect(screen.getByRole('link',{name:/Manage medications/i})).toHaveAttribute('href','/caregiver/medications'); expect(screen.getByRole('link',{name:/Caregiver notes/i})).toHaveAttribute('href','/caregiver/notes'); expect(screen.getByRole('link',{name:/Full activity log/i})).toHaveAttribute('href','/caregiver/activity')
 })
 test('ManageMedications renders and edits medication name, dose, and selected medicine',async()=>{
  const user=userEvent.setup(); renderPage(<ManageMedications/>); expect(screen.getByText('CURRENT MEDICATIONS (4)')).toBeInTheDocument(); const name=screen.getByLabelText('Medication name (required) *'); expect(name).toHaveValue('Memantine')
  await user.clear(name); await user.type(name,'Updated medicine'); expect(name).toHaveValue('Updated medicine')
  const dose=screen.getByLabelText('Dose (required) *'); await user.clear(dose); await user.type(dose,'20 mg'); expect(dose).toHaveValue('20 mg')
  const editButtons=screen.getAllByRole('button',{name:'Edit'}); await user.click(editButtons[1]); expect(name).not.toHaveValue('Updated medicine')
 })
 test('ManageAppointments renders upcoming appointments and complete editor',()=>{
  renderPage(<ManageAppointments/>); expect(screen.getByRole('heading',{name:'Manage appointments'})).toBeInTheDocument(); expect(screen.getByText('UPCOMING (3)')).toBeInTheDocument(); expect(screen.getAllByRole('button',{name:'Edit'})).toHaveLength(3); expect(screen.getAllByRole('button',{name:'Delete'})).toHaveLength(3)
  expect(screen.getAllByDisplayValue('Vision Plus Opticians')).toHaveLength(2); expect(screen.getByDisplayValue('2026-09-24')).toBeInTheDocument(); expect(screen.getByDisplayValue('15:30')).toBeInTheDocument(); expect(screen.getByRole('combobox')).toHaveValue('Clinic visit'); expect(screen.getByRole('button',{name:/Save changes/})).toBeInTheDocument()
 })
 test('ActivityLog renders event groups, legend and refresh action',()=>{
  renderPage(<ActivityLog/>); expect(screen.getByRole('heading',{name:/Activity log/i})).toBeInTheDocument(); expect(screen.getByRole('button',{name:/Refresh/i})).toBeInTheDocument(); expect(screen.getByText('TODAY — 5 events')).toBeInTheDocument(); expect(screen.getByText('YESTERDAY — 4 events')).toBeInTheDocument(); expect(screen.getByText('MONDAY, 22 SEPTEMBER')).toBeInTheDocument(); expect(screen.getByText(/Medication taken/)).toBeInTheDocument()
 })
 test('Notes renders note composer and all priority branches',()=>{
  renderPage(<Notes/>); expect(screen.getByRole('heading',{name:'Caregiver Notes'})).toBeInTheDocument(); expect(screen.getByPlaceholderText(/Describe any observations/)).toBeInTheDocument(); expect(screen.getByRole('button',{name:'Routine'})).toBeInTheDocument(); expect(screen.getByRole('button',{name:'Note'})).toBeInTheDocument(); expect(screen.getByRole('button',{name:'Urgent'})).toBeInTheDocument(); expect(screen.getByText(/confused this morning/)).toBeInTheDocument(); expect(screen.getAllByText('Routine').length).toBeGreaterThan(1); expect(screen.getAllByText('Urgent').length).toBeGreaterThan(1); expect(screen.getAllByText('Note').length).toBeGreaterThan(1)
 })
})
