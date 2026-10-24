import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SignIn from './SignIn';
import { AuthProvider } from '../auth/AuthContext';
import * as AuthContext from '../auth/AuthContext';

const mockNavigate = vi.fn();

// 1. Mock React Router's useNavigate
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('SignIn Page', () => {
  it('renders the email and password fields', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <SignIn />
        </AuthProvider>
      </MemoryRouter>
    );
    
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it('shows validation errors when submitted empty', async () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <SignIn />
        </AuthProvider>
      </MemoryRouter>
    );
    
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
    
    expect(await screen.findByText(/please enter your email address/i)).toBeInTheDocument();
    expect(await screen.findByText(/please enter your password/i)).toBeInTheDocument();
  });

  it('navigates to /role on successful sign in', async () => {
    // 2. Spy on the useAuth hook and force it to return a successful signIn function
    const mockSignIn = vi.fn().mockResolvedValue({});
    vi.spyOn(AuthContext, 'useAuth').mockReturnValue({
      user: null,
      role: null,
      loading: false,
      signIn: mockSignIn,
      signUp: vi.fn(),
      signOut: vi.fn(),
      setRole: vi.fn(),
    });

    render(
      <MemoryRouter>
        <AuthProvider>
          <SignIn />
        </AuthProvider>
      </MemoryRouter>
    );
    
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
    
    await waitFor(() => {
      // 3. Check that our fake signIn was called, AND that we navigated
      expect(mockSignIn).toHaveBeenCalledWith('test@example.com', 'password123');
      expect(mockNavigate).toHaveBeenCalledWith('/role');
    });
  });
});