import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AccessibleCard } from '../components/AccessibleCard';
import { ReadAloudButton } from '../components/ReadAloudButton';
import { useCareConnect } from '../context/AppContext';
import {
  caregiverName,
  healthSummary,
  patientName,
  providerName,
} from '../data/careData';
import { spacing, typography } from '../theme/theme';

export function MyHealthScreen() {
  const { activeTheme, textScale } = useCareConnect();

  const readText = `${patientName}. Caregiver: ${caregiverName}. Provider: ${providerName}. ${healthSummary
    .map((item) => `${item.label}: ${item.value}. ${item.plainLanguage}`)
    .join(' ')}`;

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        { backgroundColor: activeTheme.background },
      ]}
    >
      <ScrollView contentContainerStyle={styles.content}>
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
          My Health
        </Text>

        <AccessibleCard
          title={patientName}
          description={`Caregiver: ${caregiverName}. Provider: ${providerName}.`}
        >
          <ReadAloudButton text={readText} />
        </AccessibleCard>

        {healthSummary.map((item) => (
          <AccessibleCard key={item.id} title={item.label}>
            <Text
              style={[
                styles.value,
                {
                  color: activeTheme.primary,
                  fontSize: typography.body * textScale,
                },
              ]}
            >
              {item.value}
            </Text>

            <Text
              style={[
                styles.body,
                {
                  color: activeTheme.text,
                  fontSize: typography.bodySmall * textScale,
                },
              ]}
            >
              {item.plainLanguage}
            </Text>
          </AccessibleCard>
        ))}
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
  value: {
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  body: {
    lineHeight: 24,
  },
});
