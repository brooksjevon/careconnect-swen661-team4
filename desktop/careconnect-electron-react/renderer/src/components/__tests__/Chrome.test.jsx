import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, useLocation } from 'react-router-dom'
import Brand from '../Brand'
import TopBar from '../TopBar'
import { Card, SectionLabel, PageTitle } from '../UI'

function Location(){ const l=useLocation(); return <output data-testid="location">{l.pathname}</output> }
function renderRouter(ui, entries=['/first','/second']){
 return render(<MemoryRouter initialEntries={entries} initialIndex={1} future={{v7_startTransition:true,v7_relativeSplatPath:true}}>{ui}<Location/></MemoryRouter>)
}

describe('Brand and application chrome',()=>{
 test('Brand supports normal and light variants',()=>{
  const {rerender}=render(<Brand/>)
  expect(screen.getByText('CareConnect').parentElement).toHaveClass('brand')
  rerender(<Brand light/>)
  expect(screen.getByText('CareConnect').parentElement).toHaveClass('brand-light')
 })
 test('TopBar renders patient identity and back/forward navigation',async()=>{
  const user=userEvent.setup(); renderRouter(<TopBar role="Patient" name="Margaret"/>)
  expect(screen.getByText('Patient')).toBeInTheDocument(); expect(screen.getByText('Margaret')).toBeInTheDocument(); expect(screen.getByText('M')).toHaveClass('avatar')
  await user.click(screen.getByTitle(/Back/)); expect(screen.getByTestId('location')).toHaveTextContent('/first')
  await user.click(screen.getByTitle(/Forward/)); expect(screen.getByTestId('location')).toHaveTextContent('/second')
 })
 test('TopBar renders caregiver styling and initial',()=>{
  renderRouter(<TopBar role="Caregiver" name="Joyce"/>,['/caregiver/dashboard'])
  expect(screen.getByText('Caregiver')).toHaveClass('caregiver'); expect(screen.getByText('J')).toHaveClass('avatar')
 })
 test('remaining UI primitives render optional branches',()=>{
  render(<><PageTitle title="Title" action={<button>Action</button>}/><Card className="special">Body</Card><SectionLabel>SECTION</SectionLabel></>)
  expect(screen.getByRole('button',{name:'Action'})).toBeInTheDocument(); expect(screen.getByText('Body')).toHaveClass('special'); expect(screen.getByText('SECTION')).toHaveClass('section-label')
 })
})
