import { act, fireEvent, render } from '@testing-library/react-native';
import React from 'react';

import { AppProvider } from '../src/context/AppContext';

export function renderWithProvider(component: React.ReactElement) {
  return render(<AppProvider>{component}</AppProvider>);
}

export async function pressItem(item: unknown) {
  await act(async () => {
    fireEvent.press(item);
  });

  // Some onPress handlers (ReadAloudButton awaits
  // AccessibilityInfo.isScreenReaderEnabled() before speaking; several
  // screens announce a status change after a state update) are async and
  // aren't awaited by fireEvent.press itself. Flush one more
  // microtask/act cycle so their continuation runs before assertions do.
  await act(async () => {
    await Promise.resolve();
  });
}

export async function typeText(item: unknown, value: string) {
  await act(async () => {
    fireEvent.changeText(item, value);
  });
}
