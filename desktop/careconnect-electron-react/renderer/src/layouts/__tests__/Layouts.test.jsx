import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import AppLayout from '../AppLayout'
import AuthLayout from '../AuthLayout'

const wrap=ui=>render(<MemoryRouter future={{v7_startTransition:true,v7_relativeSplatPath:true}}>{ui}</MemoryRouter>)

describe('layouts',()=>{
 beforeEach(()=>sessionStorage.clear())
 test('AppLayout renders patient shell, landmarks and persists role',()=>{
  wrap(<AppLayout><h1>Patient content</h1></AppLayout>)
  expect(screen.getByRole('link',{name:/skip to main content/i})).toHaveAttribute('href','#main-content')
  expect(screen.getByRole('navigation',{name:/main navigation/i})).toBeInTheDocument()
  expect(screen.getByRole('main')).toHaveTextContent('Patient content')
  expect(screen.getByText('Margaret')).toBeInTheDocument(); expect(sessionStorage.getItem('careconnect.role')).toBe('patient')
 })
 test('AppLayout switches to caregiver identity and role',()=>{
  wrap(<AppLayout role="caregiver"><h1>Caregiver content</h1></AppLayout>)
  expect(screen.getByText('Joyce')).toBeInTheDocument(); expect(screen.getByText('Caregiver')).toBeInTheDocument(); expect(sessionStorage.getItem('careconnect.role')).toBe('caregiver')
 })
 test('AuthLayout renders brand, trust copy and supplied content',()=>{
  render(<AuthLayout><h2>Sign in form</h2></AuthLayout>)
  expect(screen.getByText('CareConnect').parentElement).toHaveClass('brand-light')
  expect(screen.getByRole('main')).toHaveTextContent('Sign in form')
  expect(screen.getByText(/Your information is private/)).toBeInTheDocument()
 })
})
