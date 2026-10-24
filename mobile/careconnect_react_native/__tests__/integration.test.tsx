import { afterEach, describe, expect, jest, test } from '@jest/globals';
import { cleanup, render } from '@testing-library/react-native';
import React from 'react';

import { AppProvider, useCareConnect } from '../src/context/AppContext';
import { MedicationsScreen } from '../src/screens/MedicationsScreen';
import { SignInScreen } from '../src/screens/SignInScreen';
import { pressItem, typeText } from './testUtils';

function IntegrationHarness() {
  const { role } = useCareConnect();

  if (!role) {
    return <SignInScreen />;
  }

  return <MedicationsScreen />;
}

afterEach(async () => {
  await cleanup();
  jest.clearAllMocks();
});

describe('CareConnect React Native integration tests', () => {
  test('patient can sign in and complete a medication workflow through shared app state', async () => {
    const app = await render(
      <AppProvider>
        <IntegrationHarness />
      </AppProvider>,
    );

    // Application begins with the sign-in workflow.
    expect(await app.findByText('CareConnect')).toBeTruthy();
    expect(await app.findByText('Sign in to continue')).toBeTruthy();

    // Enter patient credentials.
    const email = await app.findByLabelText('Email');
    const password = await app.findByLabelText('Password');

    await typeText(email, 'patient@careconnect.com');
    await typeText(password, 'test123');

    // SignInScreen updates the real AppContext.
    await pressItem(await app.findByLabelText('Sign in as Patient'));

    // The context change moves the integrated workflow to Medications.
    expect(await app.findByText('Medications')).toBeTruthy();
    expect(await app.findByText('Lisinopril - 10 mg')).toBeTruthy();

    // Complete a medication workflow interaction.
    await pressItem(await app.findByLabelText('Mark Lisinopril as taken'));

    expect(await app.findByText('Taken Today')).toBeTruthy();
  });
});
