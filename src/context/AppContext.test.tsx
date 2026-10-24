import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AppProvider, useApp } from './AppContext';

// A tiny test component to interact with the context
function TestComponent() {
  const { patient, setPatient } = useApp();
  return (
    <div>
      <span data-testid="patient-name">{patient.name}</span>
      <button onClick={() => setPatient({ name: 'New Patient' })}>Update</button>
    </div>
  );
}

describe('AppContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('provides the default patient name', () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );
    expect(screen.getByTestId('patient-name')).toHaveTextContent('Margaret');
  });

  it('updates the patient name and persists to localStorage', () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );
    
    fireEvent.click(screen.getByRole('button', { name: /update/i }));
    
    // UI updates
    expect(screen.getByTestId('patient-name')).toHaveTextContent('New Patient');
    
    // LocalStorage updates
    const saved = JSON.parse(localStorage.getItem('careconnect_patient') || '{}');
    expect(saved.name).toBe('New Patient');
  });

  it('throws an error if useApp is used outside the provider', () => {
    // Silence the React error boundary logging
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    expect(() => render(<TestComponent />)).toThrow('useApp must be used inside AppProvider');
    
    consoleSpy.mockRestore();
  });
});