import { afterEach, describe, expect, jest, test } from '@jest/globals';
import {
  act,
  cleanup,
  fireEvent,
  render,
} from '@testing-library/react-native';
import React from 'react';
import * as Speech from 'expo-speech';

import { AccessibleCard } from '../src/components/AccessibleCard';
import { ReadAloudButton } from '../src/components/ReadAloudButton';
import { AppProvider } from '../src/context/AppContext';
import { AccessibilityScreen } from '../src/screens/AccessibilityScreen';
import { AppointmentsScreen } from '../src/screens/AppointmentsScreen';
import { CarePlanScreen } from '../src/screens/CarePlanScreen';
import { HomeScreen } from '../src/screens/HomeScreen';
import { MedicationsScreen } from '../src/screens/MedicationsScreen';
import { MyHealthScreen } from '../src/screens/MyHealthScreen';
import { ScheduleScreen } from '../src/screens/ScheduleScreen';
import { SignInScreen } from '../src/screens/SignInScreen';

function renderWithProvider(component: React.ReactElement) {
  return render(<AppProvider>{component}</AppProvider>);
}

async function pressItem(item: unknown) {
  await act(async () => {
    fireEvent.press(item);
  });
}

async function typeText(item: unknown, value: string) {
  await act(async () => {
    fireEvent.changeText(item, value);
  });
}

afterEach(async () => {
  await cleanup();
  jest.clearAllMocks();
});

describe('CareConnect React Native screen and component tests', () => {
  test('SignInScreen shows role options and validates an empty form', async () => {
    const screen = await renderWithProvider(<SignInScreen />);

    expect(await screen.findByText('CareConnect')).toBeTruthy();
    expect(await screen.findByText('Sign in to continue')).toBeTruthy();
    expect(await screen.findByLabelText('Patient sign-in option')).toBeTruthy();
    expect(await screen.findByLabelText('Caregiver sign-in option')).toBeTruthy();
    expect(await screen.findByLabelText('Provider sign-in option')).toBeTruthy();

    await pressItem(await screen.findByLabelText('Sign in as Patient'));

    expect(await screen.findByText('Enter your email.')).toBeTruthy();
    expect(await screen.findByText('Enter your password.')).toBeTruthy();
  });

  test('SignInScreen allows caregiver role selection', async () => {
    const screen = await renderWithProvider(<SignInScreen />);

    await pressItem(await screen.findByLabelText('Caregiver sign-in option'));

    expect(await screen.findByLabelText('Sign in as Caregiver')).toBeTruthy();
  });

  test('HomeScreen shows dashboard content and theme options', async () => {
    const screen = await renderWithProvider(<HomeScreen />);

    expect(await screen.findByText('Good morning, Jevon Brooks')).toBeTruthy();
    expect(await screen.findByText('Next Important Action')).toBeTruthy();
    expect(await screen.findByText('Appointment')).toBeTruthy();
    expect(await screen.findByText('Care Task')).toBeTruthy();
    expect(await screen.findByText('Care Team')).toBeTruthy();

    await pressItem(await screen.findByLabelText('Blue & Green theme'));

    expect(await screen.findByLabelText('Blue & Green theme')).toBeTruthy();
  });

  test('MedicationsScreen marks medication as taken', async () => {
    const screen = await renderWithProvider(<MedicationsScreen />);

    expect(await screen.findByText('Medications')).toBeTruthy();
    expect(await screen.findByText('Lisinopril - 10 mg')).toBeTruthy();

    await pressItem(await screen.findByLabelText('Mark Lisinopril as taken'));

    expect(await screen.findByText('Taken Today')).toBeTruthy();
  });

  test('AppointmentsScreen completes appointment preparation checklist', async () => {
    const screen = await renderWithProvider(<AppointmentsScreen />);

    expect(await screen.findByText('Appointments')).toBeTruthy();
    expect(await screen.findByText('Appointment Preparation')).toBeTruthy();
    expect(await screen.findByText('Not Complete')).toBeTruthy();

    const checkboxes = await screen.findAllByRole('checkbox');

    for (const checkbox of checkboxes) {
      await pressItem(checkbox);
    }

    expect(await screen.findByText('Preparation Complete')).toBeTruthy();
  });

  test('CarePlanScreen enables finish button after all steps are checked', async () => {
    const screen = await renderWithProvider(<CarePlanScreen />);

    expect(await screen.findByText('Care Plan')).toBeTruthy();
    expect(await screen.findByText('Finish Instructions Disabled')).toBeTruthy();

    const checkboxes = await screen.findAllByRole('checkbox');

    for (const checkbox of checkboxes) {
      await pressItem(checkbox);
    }

    expect(await screen.findByText('Finish Instructions')).toBeTruthy();
  });

  test('ScheduleScreen marks a schedule item complete', async () => {
    const screen = await renderWithProvider(<ScheduleScreen />);

    expect(await screen.findByText('Schedule')).toBeTruthy();
    expect(await screen.findByText('8:00 AM - Morning Medication')).toBeTruthy();

    const checkboxes = await screen.findAllByRole('checkbox');

    await pressItem(checkboxes[0]);

    expect(await screen.findByText('☑ Complete')).toBeTruthy();
  });

  test('MyHealthScreen shows patient health summary', async () => {
    const screen = await renderWithProvider(<MyHealthScreen />);

    expect(await screen.findByText('My Health')).toBeTruthy();
    expect(await screen.findByText('Jevon Brooks')).toBeTruthy();
    expect(await screen.findByText('Blood Pressure')).toBeTruthy();
    expect(await screen.findByText('Medication')).toBeTruthy();
    expect(await screen.findByText('Care Support')).toBeTruthy();
  });

  test('AccessibilityScreen shows theme, text size, and reading support controls', async () => {
    const screen = await renderWithProvider(<AccessibilityScreen />);

    expect(await screen.findByText('Accessibility')).toBeTruthy();
    expect(await screen.findByText('Appearance Theme')).toBeTruthy();
    expect(await screen.findByText('Text Size')).toBeTruthy();
    expect(await screen.findByText('Reading Support')).toBeTruthy();

    await pressItem(await screen.findByLabelText('Purple & Pink theme'));
    await pressItem(await screen.findByLabelText('Large text size'));

    expect(await screen.findByLabelText('Purple & Pink theme')).toBeTruthy();
    expect(await screen.findByLabelText('Large text size')).toBeTruthy();
  });

  test('AccessibleCard renders content and read-aloud control', async () => {
    const screen = await renderWithProvider(
      <AccessibleCard
        title="Test Card"
        description="This card is readable."
      />,
    );

    expect(await screen.findByText('Test Card')).toBeTruthy();
    expect(await screen.findByText('This card is readable.')).toBeTruthy();
    expect(await screen.findByLabelText('Read Test Card Aloud')).toBeTruthy();
  });

  test('ReadAloudButton calls Expo Speech', async () => {
    const screen = await renderWithProvider(
      <ReadAloudButton text="Read this test aloud." label="Read Test Aloud" />,
    );

    await pressItem(await screen.findByLabelText('Read Test Aloud'));

    expect(Speech.stop).toHaveBeenCalled();
    expect(Speech.speak).toHaveBeenCalledWith(
      'Read this test aloud.',
      expect.objectContaining({
        rate: 0.85,
        pitch: 1,
      }),
    );
  });

  test('SignInScreen accepts typing into email and password fields', async () => {
    const screen = await renderWithProvider(<SignInScreen />);

    const email = await screen.findByLabelText('Email');
    const password = await screen.findByLabelText('Password');

    await typeText(email, 'student@careconnect.com');
    await typeText(password, 'test123');

    expect(email.props.value).toBe('student@careconnect.com');
    expect(password.props.value).toBe('test123');
  });
});
