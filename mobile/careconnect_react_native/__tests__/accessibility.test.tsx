import { afterEach, describe, expect, jest, test } from '@jest/globals';
import { cleanup } from '@testing-library/react-native';
import React from 'react';
import { AccessibilityInfo, Platform, StyleSheet } from 'react-native';
import * as Speech from 'expo-speech';

import { ReadAloudButton } from '../src/components/ReadAloudButton';
import { ThemeBackground } from '../src/components/ThemeBackground';
import { AccessibilityScreen } from '../src/screens/AccessibilityScreen';
import { AppointmentsScreen } from '../src/screens/AppointmentsScreen';
import { CarePlanScreen } from '../src/screens/CarePlanScreen';
import { MedicationsScreen } from '../src/screens/MedicationsScreen';
import { SignInScreen } from '../src/screens/SignInScreen';
import { pressItem, renderWithProvider } from './testUtils';

const MIN_TOUCH_TARGET = 44;

function expectAnnounced(message: string) {
  if (Platform.OS === 'android') {
    expect(
      AccessibilityInfo.announceForAccessibilityWithOptions,
    ).toHaveBeenCalledWith(message, expect.objectContaining({ queue: true }));
  } else {
    expect(AccessibilityInfo.announceForAccessibility).toHaveBeenCalledWith(
      message,
    );
  }
}

afterEach(async () => {
  await cleanup();
  jest.clearAllMocks();
});

describe('Touch targets', () => {
  test('the "Wider spacing" switch row meets the 44x44 minimum and toggles on press', async () => {
    const screen = await renderWithProvider(<AccessibilityScreen />);

    const row = await screen.findByLabelText('Wider spacing');
    const flatStyle = StyleSheet.flatten(row.props.style);

    expect(flatStyle.minHeight).toBeGreaterThanOrEqual(MIN_TOUCH_TARGET);
    expect(row.props.accessibilityRole).toBe('switch');
    expect(row.props.accessibilityState.checked).toBe(false);

    await pressItem(row);

    expect(
      (await screen.findByLabelText('Wider spacing')).props.accessibilityState
        .checked,
    ).toBe(true);
  });

  test('the "Read aloud assistance" switch row meets the 44x44 minimum and toggles independently', async () => {
    const screen = await renderWithProvider(<AccessibilityScreen />);

    const row = await screen.findByLabelText('Read aloud assistance');
    const flatStyle = StyleSheet.flatten(row.props.style);

    expect(flatStyle.minHeight).toBeGreaterThanOrEqual(MIN_TOUCH_TARGET);
    expect(row.props.accessibilityState.checked).toBe(false);

    await pressItem(row);

    expect(
      (await screen.findByLabelText('Read aloud assistance')).props
        .accessibilityState.checked,
    ).toBe(true);

    // The other switch on the same screen should be unaffected.
    expect(
      (await screen.findByLabelText('Wider spacing')).props.accessibilityState
        .checked,
    ).toBe(false);
  });

  test('every Pressable style used for a checkbox or button declares at least a 44pt minHeight', async () => {
    const screen = await renderWithProvider(<CarePlanScreen />);

    const checkboxes = await screen.findAllByRole('checkbox');
    for (const checkbox of checkboxes) {
      const flatStyle = StyleSheet.flatten(checkbox.props.style);
      expect(flatStyle.minHeight).toBeGreaterThanOrEqual(MIN_TOUCH_TARGET);
    }

    const finishButton = await screen.findByLabelText(
      'Finish Instructions Disabled',
    );
    expect(
      StyleSheet.flatten(finishButton.props.style).minHeight,
    ).toBeGreaterThanOrEqual(MIN_TOUCH_TARGET);
  });
});

describe('accessibilityHint coverage', () => {
  test('key interactive elements expose an accessibilityHint', async () => {
    const signIn = await renderWithProvider(<SignInScreen />);

    expect(
      (await signIn.findByLabelText('Patient sign-in option')).props
        .accessibilityHint,
    ).toBeTruthy();
    expect(
      (await signIn.findByLabelText('Email')).props.accessibilityHint,
    ).toBeTruthy();
    expect(
      (await signIn.findByLabelText('Password')).props.accessibilityHint,
    ).toBeTruthy();

    const meds = await renderWithProvider(<MedicationsScreen />);

    expect(
      (await meds.findByLabelText('Mark Lisinopril as taken')).props
        .accessibilityHint,
    ).toBeTruthy();

    const accessibility = await renderWithProvider(<AccessibilityScreen />);

    expect(
      (await accessibility.findByLabelText('Wider spacing')).props
        .accessibilityHint,
    ).toBeTruthy();
  });
});

describe('Platform-specific accessibility APIs', () => {
  test('ThemeBackground hides decorative icons from both TalkBack and VoiceOver', async () => {
    const screen = await renderWithProvider(<ThemeBackground variant="home" />);
    const background = await screen.findByTestId('theme-background');

    expect(background.props.accessible).toBe(false);
    expect(background.props.importantForAccessibility).toBe(
      'no-hide-descendants',
    );
    expect(background.props.accessibilityElementsHidden).toBe(true);
  });

  test('ReadAloudButton defers to an active screen reader instead of speaking itself', async () => {
    jest.mocked(AccessibilityInfo.isScreenReaderEnabled).mockResolvedValueOnce(
      true,
    );

    const screen = await renderWithProvider(
      <ReadAloudButton text="Read this test aloud." label="Read Test Aloud" />,
    );

    await pressItem(await screen.findByLabelText('Read Test Aloud'));

    expect(Speech.speak).not.toHaveBeenCalled();
    expectAnnounced('Read this test aloud.');
  });

  test('ReadAloudButton falls back to text-to-speech when no screen reader is running', async () => {
    jest.mocked(AccessibilityInfo.isScreenReaderEnabled).mockResolvedValueOnce(
      false,
    );

    const screen = await renderWithProvider(
      <ReadAloudButton text="Read this test aloud." label="Read Test Aloud" />,
    );

    await pressItem(await screen.findByLabelText('Read Test Aloud'));

    expect(Speech.speak).toHaveBeenCalledWith(
      'Read this test aloud.',
      expect.objectContaining({ rate: 0.85, pitch: 1 }),
    );
  });

  test('SignInScreen announces which fields are missing on a failed submit', async () => {
    const screen = await renderWithProvider(<SignInScreen />);

    await pressItem(await screen.findByLabelText('Sign in as Patient'));

    expectAnnounced('Enter your email and password.');
  });

  test('AppointmentsScreen announces when the preparation checklist becomes complete', async () => {
    const screen = await renderWithProvider(<AppointmentsScreen />);

    const checkboxes = await screen.findAllByRole('checkbox');
    for (const checkbox of checkboxes) {
      await pressItem(checkbox);
    }

    expectAnnounced('Preparation complete.');
  });

  test('CarePlanScreen announces when the Finish Instructions button becomes enabled', async () => {
    const screen = await renderWithProvider(<CarePlanScreen />);

    const checkboxes = await screen.findAllByRole('checkbox');
    for (const checkbox of checkboxes) {
      await pressItem(checkbox);
    }

    expectAnnounced(
      'All steps complete. Finish Instructions button is now enabled.',
    );
  });

  test('MedicationsScreen announces a confirmation once a medication is marked taken', async () => {
    const screen = await renderWithProvider(<MedicationsScreen />);

    await pressItem(await screen.findByLabelText('Mark Lisinopril as taken'));

    expectAnnounced('Lisinopril marked as taken.');
  });
});
