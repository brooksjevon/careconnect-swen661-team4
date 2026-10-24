import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppProvider } from '../context/AppContext';
import { AuthProvider } from '../auth/AuthContext';

// Import all the pages
import Today from './Today';
import Schedule from './Schedule';
import Appointments from './Appointments';
import Medications from './Medications';
import Memories from './Memories';
import Contacts from './Contacts';
import Caregiver from './Caregiver';
import ActivityLog from './ActivityLog';
import ManageMedications from './ManageMedications';
import ManageAppointments from './ManageAppointments';

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

describe('App Pages Smoke Tests', () => {
  const pages = [
    { name: 'Today', component: <Today /> },
    { name: 'Schedule', component: <Schedule /> },
    { name: 'Appointments', component: <Appointments /> },
    { name: 'Medications', component: <Medications /> },
    { name: 'Memories', component: <Memories /> },
    { name: 'Contacts', component: <Contacts /> },
    { name: 'Caregiver', component: <Caregiver /> },
    { name: 'ActivityLog', component: <ActivityLog /> },
    { name: 'ManageMedications', component: <ManageMedications /> },
    { name: 'ManageAppointments', component: <ManageAppointments /> },
  ];

  // Loop through and render each one
  pages.forEach(({ name, component }) => {
    it(`renders the ${name} page without crashing`, () => {
      renderWithProviders(component);
      expect(document.body).toBeTruthy();
    });
  });
});