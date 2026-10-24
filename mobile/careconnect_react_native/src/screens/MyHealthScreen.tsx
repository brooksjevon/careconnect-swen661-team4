import React from 'react';
import { StyleSheet, Text } from 'react-native';

import { AccessibleCard } from '../components/AccessibleCard';
import { ReadAloudButton } from '../components/ReadAloudButton';
import { ThemedScreen } from '../components/ThemedScreen';
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

  const pageReadText = `${patientName}. Caregiver: ${caregiverName}. Provider: ${providerName}. ${healthSummary
    .map((item) => `${item.label}: ${item.value}. ${item.plainLanguage}`)
    .join(' ')}`;

  return (
    <ThemedScreen backgroundVariant="myHealth">
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

      <ReadAloudButton
        text={pageReadText}
        label="Read My Health Page Aloud"
      />

      <AccessibleCard
        title={patientName}
        description={`Caregiver: ${caregiverName}. Provider: ${providerName}.`}
        readAloudText={pageReadText}
      />

      {healthSummary.map((item) => (
        <AccessibleCard
          key={item.id}
          title={item.label}
          readAloudText={`${item.label}. ${item.value}. ${item.plainLanguage}`}
        >
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
    </ThemedScreen>
  );
}

const styles = StyleSheet.create({
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
