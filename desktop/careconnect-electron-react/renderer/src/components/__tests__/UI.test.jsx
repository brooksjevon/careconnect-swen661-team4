import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button, PageTitle, Badge } from '../UI'

describe('shared UI components', () => {
  test('renders page title and subtitle', () => {
    render(<PageTitle title="Medications" subtitle="Your medication schedule" />)
    expect(screen.getByRole('heading', { name: 'Medications' })).toBeInTheDocument()
    expect(screen.getByText('Your medication schedule')).toBeInTheDocument()
  })

  test('button is keyboard/click operable', async () => {
    const user = userEvent.setup()
    const onClick = jest.fn()
    render(<Button onClick={onClick}>Save changes</Button>)
    const button = screen.getByRole('button', { name: 'Save changes' })
    button.focus()
    expect(button).toHaveFocus()
    await user.keyboard('{Enter}')
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  test('renders badge content', () => {
    render(<Badge tone="green">Taken</Badge>)
    expect(screen.getByText('Taken')).toHaveClass('badge', 'green')
  })
})
