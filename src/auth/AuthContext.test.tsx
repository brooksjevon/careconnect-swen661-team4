import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from './AuthContext';
import * as mockAuth from './mockAuth';

// A test component to trigger the auth functions
function TestAuthComponent() {
  const { user, signIn, signOut, setRole } = useAuth();
  return (
    <div>
      <span data-testid="user">{user ? user.email : 'No User'}</span>
      <button onClick={() => signIn('test@test.com', 'pw')}>Sign In</button>
      <button onClick={() => setRole('caregiver')}>Set Role</button>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
}

describe('AuthContext', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('signs in, sets role, and signs out', async () => {
    // Mock the underlying auth logic so we don't need real localstorage users
    vi.spyOn(mockAuth, 'signIn').mockResolvedValue({ user: { id: '1', name: 'Test', email: 'test@test.com' } });
    
    render(
      <AuthProvider>
        <TestAuthComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('user')).toHaveTextContent('No User');

    // 1. Click Sign In
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent('test@test.com');
    });

    // 2. Click Set Role
    fireEvent.click(screen.getByRole('button', { name: /set role/i }));
    // (setRole is synchronous)

    // 3. Click Sign Out
    fireEvent.click(screen.getByRole('button', { name: /sign out/i }));
    expect(screen.getByTestId('user')).toHaveTextContent('No User');
  });
});