import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ProtectedRoute, RoleRoute, AuthRoute } from './ProtectedRoute';
import * as AuthContext from '../auth/AuthContext';

describe('Route Guards', () => {
  it('ProtectedRoute shows loading screen when loading is true', () => {
    vi.spyOn(AuthContext, 'useAuth').mockReturnValue({ user: null, role: null, loading: true } as any);
    render(<MemoryRouter><ProtectedRoute><div>Secret</div></ProtectedRoute></MemoryRouter>);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('ProtectedRoute renders children when authed with role', () => {
    vi.spyOn(AuthContext, 'useAuth').mockReturnValue({ user: { id: '1' }, role: 'patient', loading: false } as any);
    render(<MemoryRouter><ProtectedRoute><div>Secret Content</div></ProtectedRoute></MemoryRouter>);
    expect(screen.getByText('Secret Content')).toBeInTheDocument();
  });

  it('RoleRoute renders children when authed without role', () => {
    vi.spyOn(AuthContext, 'useAuth').mockReturnValue({ user: { id: '1' }, role: null, loading: false } as any);
    render(<MemoryRouter><RoleRoute><div>Choose Role</div></RoleRoute></MemoryRouter>);
    expect(screen.getByText('Choose Role')).toBeInTheDocument();
  });

  it('AuthRoute renders children when completely unauthenticated', () => {
    vi.spyOn(AuthContext, 'useAuth').mockReturnValue({ user: null, role: null, loading: false } as any);
    render(<MemoryRouter><AuthRoute><div>Sign In Form</div></AuthRoute></MemoryRouter>);
    expect(screen.getByText('Sign In Form')).toBeInTheDocument();
  });
});