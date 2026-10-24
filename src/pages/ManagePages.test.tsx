import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppProvider } from '../context/AppContext';
import { AuthProvider } from '../auth/AuthContext';
import ManageMedications from './ManageMedications';
import ManageAppointments from './ManageAppointments';

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <MemoryRouter>
      <AuthProvider>
        <AppProvider>
          {ui}
        </AppProvider>
      </AuthProvider>
    </MemoryRouter>
  );
};

describe('Management Pages', () => {
  it('renders ManageMedications without crashing', () => {
    renderWithProviders(<ManageMedications />);
    expect(document.body).toBeTruthy();
  });

  it('renders ManageAppointments without crashing', () => {
    renderWithProviders(<ManageAppointments />);
    expect(document.body).toBeTruthy();
  });
});