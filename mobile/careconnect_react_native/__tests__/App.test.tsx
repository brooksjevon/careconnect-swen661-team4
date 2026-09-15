import { afterEach, describe, expect, jest, test } from '@jest/globals';
import {
  cleanup,
  fireEvent,
  render,
  userEvent,
  waitFor,
} from '@testing-library/react-native';
import React from 'react';

import App from '../App';

afterEach(async () => {
  await cleanup();
  jest.clearAllMocks();
});

describe('CareConnect React Native app', () => {
  test('shows sign-in roles', async () => {
    const { getByLabelText, getByText } = await render(<App />);

    expect(getByText('CareConnect')).toBeTruthy();
    expect(getByText('Sign in to continue')).toBeTruthy();
    expect(getByLabelText('Patient sign-in option')).toBeTruthy();
    expect(getByLabelText('Caregiver sign-in option')).toBeTruthy();
    expect(getByLabelText('Provider sign-in option')).toBeTruthy();
  });

  test('shows validation messages when sign-in is submitted empty', async () => {
    const user = userEvent.setup();
    const { getByLabelText, getByText } = await render(<App />);

    await user.press(getByLabelText('Sign in as Patient'));

    await waitFor(() => {
      expect(getByText('Enter your email.')).toBeTruthy();
      expect(getByText('Enter your password.')).toBeTruthy();
    });
  });

  test('caregiver can sign in and see caregiver dashboard', async () => {
    const user = userEvent.setup();
    const { getByLabelText, getByText } = await render(<App />);

    await user.press(getByLabelText('Caregiver sign-in option'));

    await waitFor(() => {
      expect(getByLabelText('Sign in as Caregiver')).toBeTruthy();
    });

    fireEvent.changeText(getByLabelText('Email'), 'test@careconnect.com');
    fireEvent.changeText(getByLabelText('Password'), 'test123');

    await user.press(getByLabelText('Sign in as Caregiver'));

    await waitFor(() => {
      expect(getByText('Caregiver Dashboard')).toBeTruthy();
      expect(
        getByText("Review Jevon Brooks's care activity and upcoming needs."),
      ).toBeTruthy();
    });
  });

  test('provider can sign in and see provider dashboard', async () => {
    const user = userEvent.setup();
    const { getByLabelText, getByText } = await render(<App />);

    await user.press(getByLabelText('Provider sign-in option'));

    await waitFor(() => {
      expect(getByLabelText('Sign in as Provider')).toBeTruthy();
    });

    fireEvent.changeText(getByLabelText('Email'), 'provider@careconnect.com');
    fireEvent.changeText(getByLabelText('Password'), 'test123');

    await user.press(getByLabelText('Sign in as Provider'));

    await waitFor(() => {
      expect(getByText('Provider Dashboard')).toBeTruthy();
      expect(
        getByText(
          "Review Jevon Brooks's medications, appointments, and care plan.",
        ),
      ).toBeTruthy();
    });
  });

  test('patient can sign in and switch user returns to sign-in screen', async () => {
    const user = userEvent.setup();
    const { getByLabelText, getByText } = await render(<App />);

    fireEvent.changeText(getByLabelText('Email'), 'patient@careconnect.com');
    fireEvent.changeText(getByLabelText('Password'), 'test123');

    await user.press(getByLabelText('Sign in as Patient'));

    await waitFor(() => {
      expect(getByText('Good morning, Jevon Brooks')).toBeTruthy();
    });

    await user.press(getByLabelText('Switch user'));

    await waitFor(() => {
      expect(getByText('Sign in to continue')).toBeTruthy();
      expect(getByLabelText('Patient sign-in option')).toBeTruthy();
    });
  });

  test('theme can be changed from Home screen', async () => {
    const user = userEvent.setup();
    const { getByLabelText, getByText } = await render(<App />);

    fireEvent.changeText(getByLabelText('Email'), 'patient@careconnect.com');
    fireEvent.changeText(getByLabelText('Password'), 'test123');

    await user.press(getByLabelText('Sign in as Patient'));

    await waitFor(() => {
      expect(getByText('Good morning, Jevon Brooks')).toBeTruthy();
    });

    await user.press(getByLabelText('Blue & Green theme'));

    await waitFor(() => {
      expect(getByLabelText('Blue & Green theme')).toBeTruthy();
    });
  });
});
