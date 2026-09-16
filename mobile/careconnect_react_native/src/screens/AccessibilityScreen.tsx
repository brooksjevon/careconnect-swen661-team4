import React from 'react';
import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';

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
              accessibilityRole="button"
              accessibilityState={{ selected }}
              accessibilityLabel={`${themeValue.name} theme`}
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
              accessibilityRole="button"
              accessibilityState={{ selected }}
              accessibilityLabel={`${item.label} text size`}
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
        <View style={styles.switchRow}>
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
            accessibilityLabel="Wider spacing"
            value={wideSpacing}
            onValueChange={setWideSpacing}
          />
        </View>

        <View style={styles.switchRow}>
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
            accessibilityLabel="Read aloud assistance"
            value={readAloudEnabled}
            onValueChange={setReadAloudEnabled}
          />
        </View>
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
