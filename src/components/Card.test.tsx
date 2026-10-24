import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Card from './Card';

describe('Card', () => {
  it('renders the heading and children', () => {
    render(
      <Card heading="Patient Status">
        <p>All good</p>
      </Card>
    );
    
    // Should render an accessible heading
    expect(screen.getByRole('heading', { name: /patient status/i })).toBeInTheDocument();
    expect(screen.getByText('All good')).toBeInTheDocument();
  });

  it('hides the heading visually but keeps it for screen readers if headingHidden is true', () => {
    render(
      <Card heading="Secret Data" headingHidden>
        <p>Content</p>
      </Card>
    );
    
    // The heading still exists in the DOM
    const heading = screen.getByRole('heading', { name: /secret data/i });
    expect(heading).toBeInTheDocument();
    // It should have the sr-only class
    expect(heading).toHaveClass('sr-only');
  });
});