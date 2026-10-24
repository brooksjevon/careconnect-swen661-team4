import { describe, it, expect, beforeEach } from 'vitest';
import { signUp, signIn, getSession, persistSession, clearSession, persistRole } from './mockAuth';

describe('mockAuth', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('signs up a new user and persists them to storage', async () => {
    const result = await signUp('John Doe', 'john@test.com', 'password123');
    
    expect(result.user).toBeDefined();
    expect(result.error).toBeUndefined();
    expect(result.user?.name).toBe('John Doe');
    
    const users = JSON.parse(localStorage.getItem('careconnect_users') || '[]');
    expect(users).toHaveLength(1);
    expect(users[0].email).toBe('john@test.com');
  });

  it('prevents duplicate signups', async () => {
    await signUp('John', 'john@test.com', 'pw');
    const result = await signUp('Jane', 'JOHN@test.com', 'pw'); // Test case-insensitivity
    
    expect(result.error).toBeDefined();
    expect(result.error).toMatch(/already exists/i);
  });

  it('signs in an existing user', async () => {
    await signUp('John', 'john@test.com', 'pw');
    const result = await signIn('john@test.com', 'anypassword');
    
    expect(result.user).toBeDefined();
    expect(result.user?.email).toBe('john@test.com');
  });

  it('fails to sign in an unknown email', async () => {
    const result = await signIn('nobody@test.com', 'pw');
    
    expect(result.error).toBeDefined();
    expect(result.error).toMatch(/couldn't find an account/i);
  });

  it('persists and retrieves a session', () => {
    const mockUser = { id: '1', name: 'Test', email: 'test@test.com' };
    persistSession({ user: mockUser, role: null });
    
    const session = getSession();
    expect(session?.user.name).toBe('Test');
    
    clearSession();
    expect(getSession()).toBeNull();
  });

  it('updates the role on a persisted session', () => {
    const mockUser = { id: '1', name: 'Test', email: 'test@test.com' };
    persistSession({ user: mockUser, role: null });
    
    persistRole('caregiver');
    
    const session = getSession();
    expect(session?.role).toBe('caregiver');
  });
});