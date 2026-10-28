import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import Settings from '../Settings'
import { SettingsProvider } from '../../components/SettingsProvider'

jest.mock('../../layouts/AppLayout', () => ({
  __esModule: true,
  default: ({ children }) => <main>{children}</main>
}))

function renderSettings(){
 return render(<SettingsProvider><MemoryRouter future={{v7_startTransition:true,v7_relativeSplatPath:true}}><Settings/></MemoryRouter></SettingsProvider>)
}

describe('Settings page',()=>{
 beforeEach(()=>{localStorage.clear();sessionStorage.clear();delete window.careConnectDesktop})

 test('changes font size',async()=>{
  const user=userEvent.setup();renderSettings()
  expect(screen.getByText('medium')).toBeInTheDocument()
  await user.click(screen.getByRole('button',{name:'Increase font size'}))
  expect(screen.getByText('large')).toBeInTheDocument()
 })

 test('changes display mode and theme',async()=>{
  const user=userEvent.setup();renderSettings()
  await user.click(screen.getByRole('button',{name:/Dark Reduced brightness/i}))
  expect(document.documentElement.dataset.mode).toBe('dark')
  await user.click(screen.getByRole('button',{name:/Emerald Fresh green/i}))
  expect(document.documentElement.dataset.theme).toBe('emerald')
 })

 test('sends a Windows test notification through the preload API',async()=>{
  const showNotification=jest.fn()
  window.careConnectDesktop={showNotification}
  const user=userEvent.setup();renderSettings()
  await user.click(screen.getByRole('button',{name:'Send test Windows notification'}))
  expect(showNotification).toHaveBeenCalledWith('CareConnect reminder','This is a test Windows notification.')
 })
})
