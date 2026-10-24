import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppProvider } from '../context/AppContext';
import { AuthProvider } from '../auth/AuthContext';
import Landing from './Landing';
import SignUp from './SignUp';
import RoleChooser from './RoleChooser';

// Helper to wrap components in necessary providers
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

describe('Public Pages Smoke Tests', () => {
  it('renders the Landing page without crashing', () => {
    renderWithProviders(<Landing />);
    expect(document.body).toBeTruthy();
  });

  it('renders the SignUp page without crashing', () => {
    renderWithProviders(<SignUp />);
    expect(document.body).toBeTruthy();
  });

  it('renders the RoleChooser page without crashing', () => {
    renderWithProviders(<RoleChooser />);
    expect(document.body).toBeTruthy();
  });
});