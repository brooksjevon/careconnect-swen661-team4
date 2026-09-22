import React from 'react';
import { Pressable, StyleSheet, Switch, Text } from 'react-native';

import { AccessibleCard } from '../components/AccessibleCard';
import { ReadAloudButton } from '../components/ReadAloudButton';
import { ThemedScreen } from '../components/ThemedScreen';
import { useCareConnect } from '../context/AppContext';
import { ThemeOption } from '../models/types';
import { spacing, themes, typography } from '../theme/theme';

const textSizes = [
  { label: 'Standard', value: 1 },
  { label: 'Large', value: 1.15 },
  { label: 'Extra Large', value: 1.3 },
];

export function AccessibilityScreen() {
  const {
    activeTheme,
    selectedTheme,
    setSelectedTheme,
    textScale,
    setTextScale,
    wideSpacing,
    setWideSpacing,
    readAloudEnabled,
    setReadAloudEnabled,
  } = useCareConnect();

  const pageReadText =
    'Accessibility settings. Choose a theme, change text size, turn on wider spacing, or turn on read aloud assistance.';

  return (
    <ThemedScreen backgroundVariant="accessibility">
      <Text
        accessibilityRole="header"
        style={[
          styles.title,
          {
            color: activeTheme.primary,
            fontSize: typography.screenTitle * textScale,
          },
        ]}
      >
        Accessibility
      </Text>

      <ReadAloudButton
        text={pageReadText}
        label="Read Accessibility Page Aloud"
      />

      <AccessibleCard
        title="Appearance Theme"
        description="Choose the visual theme that is easiest to read."
        readAloudText="Appearance Theme. Choose the visual theme that is easiest to read."
      >
        {Object.entries(themes).map(([themeKey, themeValue]) => {
          const key = themeKey as ThemeOption;
          const selected = selectedTheme === key;

          return (
            <Pressable
              key={key}
              accessible
              accessibilityRole="button"
              accessibilityState={{ selected }}
              accessibilityLabel={`${themeValue.name} theme`}
              accessibilityHint="Applies this color theme throughout the app."
              onPress={() => setSelectedTheme(key)}
              style={[
                styles.option,
                {
                  backgroundColor: selected
                    ? themeValue.softSurface
                    : activeTheme.surface,
                  borderColor: selected
                    ? themeValue.primary
                    : activeTheme.border,
                },
              ]}
            >
              <Text
                style={[
                  styles.optionText,
                  {
                    color: activeTheme.text,
                    fontSize: typography.bodySmall * textScale,
                  },
                ]}
              >
                {selected ? '● ' : '○ '}
                {themeValue.name}
              </Text>
            </Pressable>
          );
        })}
      </AccessibleCard>

      <AccessibleCard
        title="Text Size"
        description="Increase text size without changing the care workflow."
        readAloudText="Text Size. Increase text size without changing the care workflow."
      >
        {textSizes.map((item) => {
          const selected = textScale === item.value;

          return (
            <Pressable
              key={item.label}
              accessible
              accessibilityRole="button"
              accessibilityState={{ selected }}
              accessibilityLabel={`${item.label} text size`}
              accessibilityHint="Changes the text size used throughout the app."
              onPress={() => setTextScale(item.value)}
              style={[
                styles.option,
                {
                  backgroundColor: selected
                    ? activeTheme.softSurface
                    : activeTheme.surface,
                  borderColor: selected
                    ? activeTheme.primary
                    : activeTheme.border,
                },
              ]}
            >
              <Text
                style={[
                  styles.optionText,
                  {
                    color: activeTheme.text,
                    fontSize: typography.bodySmall * textScale,
                  },
                ]}
              >
                {selected ? '● ' : '○ '}
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </AccessibleCard>

      <AccessibleCard
        title="Reading Support"
        readAloudText="Reading Support. Wider spacing and read aloud assistance can be turned on or off."
      >
        <Pressable
          accessible
          accessibilityRole="switch"
          accessibilityState={{ checked: wideSpacing }}
          accessibilityLabel="Wider spacing"
          accessibilityHint="Increases spacing between items on every screen for easier reading."
          onPress={() => setWideSpacing(!wideSpacing)}
          style={styles.switchRow}
        >
          <Text
            style={[
              styles.switchText,
              {
                color: activeTheme.text,
                fontSize: typography.bodySmall * textScale,
              },
            ]}
          >
            Wider spacing
          </Text>

          <Switch
            value={wideSpacing}
            onValueChange={setWideSpacing}
            pointerEvents="none"
            importantForAccessibility="no-hide-descendants"
            accessibilityElementsHidden
          />
        </Pressable>

        <Pressable
          accessible
          accessibilityRole="switch"
          accessibilityState={{ checked: readAloudEnabled }}
          accessibilityLabel="Read aloud assistance"
          accessibilityHint="Turns on read aloud support for screen content."
          onPress={() => setReadAloudEnabled(!readAloudEnabled)}
          style={styles.switchRow}
        >
          <Text
            style={[
              styles.switchText,
              {
                color: activeTheme.text,
                fontSize: typography.bodySmall * textScale,
              },
            ]}
          >
            Read aloud assistance
          </Text>

          <Switch
            value={readAloudEnabled}
            onValueChange={setReadAloudEnabled}
            pointerEvents="none"
            importantForAccessibility="no-hide-descendants"
            accessibilityElementsHidden
          />
        </Pressable>
      </AccessibleCard>
    </ThemedScreen>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: '700',
    marginBottom: spacing.base,
  },
  option: {
    borderRadius: 14,
    borderWidth: 1,
    justifyContent: 'center',
    marginBottom: spacing.sm,
    minHeight: 52,
    paddingHorizontal: spacing.base,
  },
  optionText: {
    fontWeight: '600',
  },
  switchRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 56,
  },
  switchText: {
    flex: 1,
    lineHeight: 24,
  },
});
