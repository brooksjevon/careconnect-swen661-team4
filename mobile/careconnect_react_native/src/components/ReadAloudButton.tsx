import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import * as Speech from 'expo-speech';

import { useCareConnect } from '../context/AppContext';
import { spacing, typography } from '../theme/theme';

type ReadAloudButtonProps = {
  text: string;
  label?: string;
};

export function ReadAloudButton({
  text,
  label = 'Read Aloud',
}: ReadAloudButtonProps) {
  const { activeTheme, textScale } = useCareConnect();

  const speak = () => {
    Speech.stop();
    Speech.speak(text, {
      rate: 0.85,
      pitch: 1,
    });
  };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={speak}
      style={[
        styles.button,
        {
          borderColor: activeTheme.primary,
          backgroundColor: activeTheme.surface,
        },
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            color: activeTheme.primary,
            fontSize: typography.bodySmall * textScale,
          },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1,
    justifyContent: 'center',
    marginTop: spacing.md,
    minHeight: 48,
    paddingHorizontal: spacing.base,
  },
  text: {
    fontWeight: '700',
  },
});
