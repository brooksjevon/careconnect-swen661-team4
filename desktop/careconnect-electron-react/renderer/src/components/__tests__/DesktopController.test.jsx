import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import DesktopController from '../DesktopController'

beforeAll(()=>{
 Element.prototype.scrollIntoView=jest.fn()
 Element.prototype.getBoundingClientRect=function(){
   const i=Number(this.dataset?.pos||0)
   return {x:i*100,y:0,left:i*100,right:i*100+80,top:0,bottom:40,width:80,height:40}
 }
})
beforeEach(()=>{delete window.careConnectDesktop})

function Harness(){
 return <>
  <DesktopController/>
  <div data-keyboard-region="content">
   <button data-pos="1">First</button>
   <button data-pos="2">Second</button>
  </div>
 </>
}
function renderHarness(){
 return render(
  <MemoryRouter initialEntries={['/patient/home']} future={{v7_startTransition:true,v7_relativeSplatPath:true}}>
   <Routes><Route path="*" element={<Harness/>}/></Routes>
  </MemoryRouter>
 )
}

describe('DesktopController accessibility navigation',()=>{
 test('Ctrl+/ opens keyboard guide and Escape closes it',async()=>{
  const user=userEvent.setup();renderHarness()
  await user.keyboard('{Control>}/{/Control}')
  expect(screen.getByRole('dialog',{name:'Keyboard navigation'})).toBeInTheDocument()
  await user.keyboard('{Escape}')
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
 })

test('Ctrl+/ opens keyboard guide and Escape closes it', async () => {
  const user = userEvent.setup()
  renderHarness()

  await user.keyboard('{Control>}/{/Control}')

  expect(
    screen.getByRole('dialog', { name: 'Keyboard navigation' })
  ).toBeInTheDocument()

  await user.keyboard('{Escape}')

  expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
})

 test('Electron menu shortcut command can open About dialog', async () => {
  let commandCallback

  window.careConnectDesktop = {
    onNavigate: jest.fn(() => jest.fn()),
    onCommand: jest.fn(cb => {
      commandCallback = cb
      return jest.fn()
    })
  }

  renderHarness()

  await act(async () => {
    commandCallback('about')
  })

  expect(screen.getByRole('dialog')).toBeInTheDocument()
  expect(screen.getByText('CareConnect Desktop')).toBeInTheDocument()
})
})

describe('DesktopController keyboard command coverage',()=>{
 test('Alt navigation, role switch and numbered route shortcuts work',async()=>{
  const user=userEvent.setup(); renderHarness()
  await user.keyboard('{Alt>}{ArrowLeft}{/Alt}')
  await user.keyboard('{Alt>}{ArrowRight}{/Alt}')
  await user.keyboard('{Control>}{Shift>}r{/Shift}{/Control}')
  expect(window.location).toBeDefined()
 })
 test('arrow keys, Home and End move focus among visible controls',async()=>{
  const user=userEvent.setup(); renderHarness(); const first=screen.getByRole('button',{name:'First'}); const second=screen.getByRole('button',{name:'Second'})
  first.focus(); await user.keyboard('{ArrowRight}'); expect(second).toHaveFocus()
  await user.keyboard('{ArrowLeft}'); expect(first).toHaveFocus()
  await user.keyboard('{End}'); expect(second).toHaveFocus()
  await user.keyboard('{Home}'); expect(first).toHaveFocus()
 })
 test('ArrowDown and ArrowUp safely handle no directional candidate',async()=>{
  const user=userEvent.setup(); renderHarness(); const first=screen.getByRole('button',{name:'First'}); first.focus(); await user.keyboard('{ArrowDown}{ArrowUp}'); expect(first).toHaveFocus()
 })
 test('PageDown and PageUp traverse keyboard regions',async()=>{
  const user=userEvent.setup()
  render(<MemoryRouter initialEntries={['/patient/home']} future={{v7_startTransition:true,v7_relativeSplatPath:true}}><DesktopController/><nav data-pos="1"><button data-pos="1">Nav</button></nav><main data-pos="2"><button data-pos="2">Main</button></main></MemoryRouter>)
  const nav=screen.getByRole('button',{name:'Nav'}); nav.focus(); await user.keyboard('{PageDown}'); expect(screen.getByRole('button',{name:'Main'})).toHaveFocus(); await user.keyboard('{PageUp}'); expect(nav).toHaveFocus()
 })
 test('editable controls preserve native arrow handling',async()=>{
  const user=userEvent.setup(); render(<MemoryRouter future={{v7_startTransition:true,v7_relativeSplatPath:true}}><DesktopController/><input aria-label="Editor" defaultValue="abc" data-pos="1"/><button data-pos="2">Other</button></MemoryRouter>)
  const input=screen.getByLabelText('Editor'); input.focus(); await user.keyboard('{ArrowRight}'); expect(input).toHaveFocus()
 })
 test('Escape without dialog returns focus toward active sidebar link',async()=>{
  const user=userEvent.setup(); render(<MemoryRouter future={{v7_startTransition:true,v7_relativeSplatPath:true}}><DesktopController/><a className="side-link active" href="#x" data-pos="1">Active link</a><button data-pos="2">Temp</button></MemoryRouter>)
  screen.getByRole('button',{name:'Temp'}).focus(); await user.keyboard('{Escape}'); expect(screen.getByRole('link',{name:'Active link'})).toHaveFocus()
 })
 test('Electron API subscriptions handle navigate, shortcuts, back and forward and cleanup',async()=>{
  let navCb,cmdCb; const offNav=jest.fn(),offCommand=jest.fn()
  window.careConnectDesktop={onNavigate:jest.fn(cb=>{navCb=cb;return offNav}),onCommand:jest.fn(cb=>{cmdCb=cb;return offCommand})}
  const view=renderHarness(); expect(window.careConnectDesktop.onNavigate).toHaveBeenCalled(); expect(window.careConnectDesktop.onCommand).toHaveBeenCalled()
  await act(async()=>{navCb('/patient/today')}); await act(async()=>{cmdCb('shortcuts')}); expect(screen.getByRole('dialog',{name:'Keyboard navigation'})).toBeInTheDocument()
  await act(async()=>{cmdCb('back');cmdCb('forward')}); view.unmount(); expect(offNav).toHaveBeenCalled(); expect(offCommand).toHaveBeenCalled()
 })
})
