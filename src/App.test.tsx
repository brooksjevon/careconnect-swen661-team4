import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders the app without crashing and shows the Landing page by default', () => {
    render(<App />);
    // Because it's not logged in, the default route "/" should render Landing
    expect(screen.getAllByText(/CareConnect/i).length).toBeGreaterThan(0);
  });
});