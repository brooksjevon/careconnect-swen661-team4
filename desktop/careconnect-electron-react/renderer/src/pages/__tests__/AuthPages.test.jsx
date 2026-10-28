import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import SignIn from '../auth/SignIn'
import SignUp from '../auth/SignUp'

jest.mock('../../layouts/AuthLayout',()=>({
 __esModule:true,
 default:({children})=><main>{children}</main>
}))

function renderRoute(component,path){
 return render(
  <MemoryRouter initialEntries={[path]} future={{v7_startTransition:true,v7_relativeSplatPath:true}}>
   <Routes>
    <Route path={path} element={component}/>
    <Route path="/choose-role" element={<h1>Choose role test page</h1>}/>
    <Route path="/signin" element={<h1>Sign in route</h1>}/>
    <Route path="/signup" element={<h1>Sign up route</h1>}/>
   </Routes>
  </MemoryRouter>
 )
}

describe('Authentication pages',()=>{
 test('SignIn renders accessible fields and navigates after keyboard activation',async()=>{
  const user=userEvent.setup();renderRoute(<SignIn/>,'/signin')
  expect(screen.getByRole('heading',{name:'Welcome back'})).toBeInTheDocument()
  expect(screen.getByLabelText('Email address *')).toBeInTheDocument()
  expect(screen.getByLabelText('Password *')).toHaveAttribute('type','password')
  const button=screen.getByRole('button',{name:'Sign in'})
  button.focus();await user.keyboard('{Enter}')
  expect(screen.getByRole('heading',{name:'Choose role test page'})).toBeInTheDocument()
 })

 test('SignUp renders fields and navigates after submit button activation',async()=>{
  const user=userEvent.setup();renderRoute(<SignUp/>,'/signup')
  expect(screen.getByRole('heading',{name:'Create your account'})).toBeInTheDocument()
  expect(screen.getByLabelText('Full name *')).toHaveValue('Margaret')
  expect(screen.getByLabelText('Email address *')).toBeInTheDocument()
  await user.click(screen.getByRole('button',{name:'Create free account'}))
  expect(screen.getByRole('heading',{name:'Choose role test page'})).toBeInTheDocument()
 })
})
