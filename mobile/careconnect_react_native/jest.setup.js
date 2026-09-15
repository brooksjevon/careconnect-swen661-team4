jest.mock('expo-speech', () => ({
  speak: jest.fn(),
  stop: jest.fn(),
}));

jest.mock('react-native-safe-area-context', () => {
  const React = require('react');
  const { View } = require('react-native');

  return {
    SafeAreaProvider: ({ children }) =>
      React.createElement(View, null, children),

    SafeAreaView: ({ children, style }) =>
      React.createElement(View, { style }, children),

    useSafeAreaInsets: () => ({
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    }),

    useSafeAreaFrame: () => ({
      x: 0,
      y: 0,
      width: 390,
      height: 844,
    }),
  };
});

jest.mock('react-native-screens', () => ({
  enableScreens: jest.fn(),
}));
