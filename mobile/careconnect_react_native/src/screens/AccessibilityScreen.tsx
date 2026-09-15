import React from 'react';
import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AccessibleCard } from '../components/AccessibleCard';
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

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: activeTheme.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text accessibilityRole="header" style={[styles.title, { color: activeTheme.primary, fontSize: typography.screenTitle * textScale }]}>
          Accessibility
        </Text>

        <AccessibleCard
          title="Appearance Theme"
          description="Choose the visual theme that is easiest to read."
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
                    backgroundColor: selected ? themeValue.softSurface : activeTheme.surface,
                    borderColor: selected ? themeValue.primary : activeTheme.border,
                  },
                ]}
              >
                <Text style={[styles.optionText, { color: activeTheme.text, fontSize: typography.bodySmall * textScale }]}>
                  {selected ? '● ' : '○ '}
                  {themeValue.name}
                </Text>
              </Pressable>
            );
          })}
        </AccessibleCard>

        <AccessibleCard title="Text Size" description="Increase text size without changing the care workflow.">
          {textSizes.map((item) => {
            const selected = textScale === item.value;

            return (
              <Pressable
                key={item.label}
                accessibilityRole="button"
                accessibilityState={{ selected }}
                onPress={() => setTextScale(item.value)}
                style={[
                  styles.option,
                  {
                    backgroundColor: selected ? activeTheme.softSurface : activeTheme.surface,
                    borderColor: selected ? activeTheme.primary : activeTheme.border,
                  },
                ]}
              >
                <Text style={[styles.optionText, { color: activeTheme.text, fontSize: typography.bodySmall * textScale }]}>
                  {selected ? '● ' : '○ '}
                  {item.label}
                </Text>
              </Pressable>
            );
          })}
        </AccessibleCard>

        <AccessibleCard title="Reading Support">
          <View style={styles.switchRow}>
            <Text style={[styles.switchText, { color: activeTheme.text, fontSize: typography.bodySmall * textScale }]}>
              Wider spacing
            </Text>
            <Switch value={wideSpacing} onValueChange={setWideSpacing} />
          </View>

          <View style={styles.switchRow}>
            <Text style={[styles.switchText, { color: activeTheme.text, fontSize: typography.bodySmall * textScale }]}>
              Read aloud assistance
            </Text>
            <Switch value={readAloudEnabled} onValueChange={setReadAloudEnabled} />
          </View>
        </AccessibleCard>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  content: { padding: spacing.base },
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
