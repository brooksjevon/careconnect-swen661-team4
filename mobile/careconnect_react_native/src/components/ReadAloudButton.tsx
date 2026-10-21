import React from 'react';
import { AccessibilityInfo, Pressable, StyleSheet, Text } from 'react-native';
import * as Speech from 'expo-speech';

import { useCareConnect } from '../context/AppContext';
import { spacing, typography } from '../theme/theme';
import { announceForAccessibility } from '../utils/accessibilityAnnounce';

type ReadAloudButtonProps = {
  text: string;
  label?: string;
};

export function ReadAloudButton({
  text,
  label = 'Read Aloud',
}: ReadAloudButtonProps) {
  const { activeTheme, textScale } = useCareConnect();

  const speak = async () => {
    Speech.stop();

    // If VoiceOver or TalkBack is already running, hand the text to it
    // instead of layering our own text-to-speech voice on top, which
    // would talk over the screen reader at the same time.
    const screenReaderEnabled = await AccessibilityInfo.isScreenReaderEnabled();

    if (screenReaderEnabled) {
      announceForAccessibility(text);
      return;
    }

    Speech.speak(text, {
      rate: 0.85,
      pitch: 1,
    });
  };

  return (
    <Pressable
      accessible
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityHint="Speaks this screen's content aloud using text to speech."
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
