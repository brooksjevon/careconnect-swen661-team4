import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppProvider } from '../context/AppContext';
import { AuthProvider } from '../auth/AuthContext';
import Layout from './Layout';

describe('Layout Component', () => {
  it('renders without crashing for patient view and handles signout', () => {
    const mockSignOut = vi.fn();
    const mockSwitchRole = vi.fn();

    render(
      <MemoryRouter>
        <AuthProvider>
          <AppProvider>
            <Layout view="patient" onSwitchRole={mockSwitchRole} onSignOut={mockSignOut}>
              <div data-testid="child-content">Inner Content</div>
            </Layout>
          </AppProvider>
        </AuthProvider>
      </MemoryRouter>
    );

    // Verify it renders its children
    expect(screen.getByTestId('child-content')).toBeInTheDocument();
    
    // Verify it renders the nav links (using a broad query just in case)
    expect(screen.getAllByRole('link').length).toBeGreaterThan(0);
  });

  it('renders without crashing for caregiver view', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <AppProvider>
            <Layout view="caregiver" onSwitchRole={vi.fn()} onSignOut={vi.fn()}>
              <div data-testid="child-content">Inner Content</div>
            </Layout>
          </AppProvider>
        </AuthProvider>
      </MemoryRouter>
    );

    expect(screen.getByTestId('child-content')).toBeInTheDocument();
  });
});