import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppProvider } from '../context/AppContext';
import { AuthProvider } from '../auth/AuthContext';
import Home from './Home';
import InstallPrompt from '../components/InstallPrompt';

describe('Home Page', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <AppProvider>
            <Home />
          </AppProvider>
        </AuthProvider>
      </MemoryRouter>
    );
    expect(document.body).toBeTruthy();
  });
});

describe('InstallPrompt Component', () => {
  it('renders without crashing (handles missing beforeinstallprompt)', () => {
    render(<InstallPrompt />);
    // It should render null or a hidden prompt, so body should still exist
    expect(document.body).toBeTruthy();
  });
});