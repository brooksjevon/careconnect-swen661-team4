import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  it('renders children and handles basic clicks', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    
    const btn = screen.getByRole('button', { name: /click me/i });
    expect(btn).toBeInTheDocument();
    
    fireEvent.click(btn);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not fire onClick when disabled', () => {
    const handleClick = vi.fn();
    render(<Button disabled onClick={handleClick}>Click Me</Button>);
    
    const btn = screen.getByRole('button', { name: /click me/i });
    expect(btn).toBeDisabled();
    
    fireEvent.click(btn);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('opens a confirmation dialog for the danger variant before firing onClick', () => {
    const handleClick = vi.fn();
    render(<Button variant="danger" onClick={handleClick}>Delete</Button>);
    
    // 1. Click the button
    fireEvent.click(screen.getByRole('button', { name: /delete/i }));
    
    // 2. onClick should NOT have fired yet, and the dialog should be open
    expect(handleClick).not.toHaveBeenCalled();
    expect(screen.getByText(/are you sure\?/i)).toBeInTheDocument();
    
    // 3. Click confirm inside the dialog (assuming ConfirmDialog uses a "Confirm" button)
    const confirmBtn = screen.getByRole('button', { name: /confirm/i });
    fireEvent.click(confirmBtn);
    
    // 4. NOW onClick should have fired
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});