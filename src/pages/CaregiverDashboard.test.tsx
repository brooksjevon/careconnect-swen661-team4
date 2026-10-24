import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CaregiverDashboard from './CaregiverDashboard';

describe('CaregiverDashboard', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <CaregiverDashboard />
      </BrowserRouter>
    );
    expect(document.body).toBeTruthy();
  });
});