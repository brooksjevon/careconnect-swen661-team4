import React, { useState } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { AccessibleCard } from '../components/AccessibleCard';
import { ReadAloudButton } from '../components/ReadAloudButton';
import { ThemedScreen } from '../components/ThemedScreen';
import { useCareConnect } from '../context/AppContext';
import { medications } from '../data/careData';
import { spacing, typography } from '../theme/theme';
import { announceForAccessibility } from '../utils/accessibilityAnnounce';

export function MedicationsScreen() {
  const { activeTheme, textScale } = useCareConnect();
  const [takenIds, setTakenIds] = useState<string[]>([]);

  const markTaken = (id: string, name: string) => {
    setTakenIds((current) => {
      if (current.includes(id)) {
        return current;
      }

      announceForAccessibility(`${name} marked as taken.`);
      return [...current, id];
    });
  };

  const pageReadText = medications
    .map(
      (medication) =>
        `${medication.name}, ${medication.dose}. ${medication.take}. ${medication.when}. ${medication.purpose}.`,
    )
    .join(' ');

  return (
    <ThemedScreen backgroundVariant="medications">
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
        Medications
      </Text>

      <ReadAloudButton
        text={pageReadText}
        label="Read Medications Page Aloud"
      />

      {medications.map((medication) => {
        const taken = takenIds.includes(medication.id);
        const readText = `${medication.name}, ${medication.dose}. ${medication.take}. ${medication.when}. ${medication.purpose}.`;

        return (
          <AccessibleCard
            key={medication.id}
            title={`${medication.name} - ${medication.dose}`}
            readAloudText={readText}
          >
            <Text
              style={[
                styles.body,
                {
                  color: activeTheme.text,
                  fontSize: typography.bodySmall * textScale,
                },
              ]}
            >
              Take: {medication.take}
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
              When: {medication.when}
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
              Used for: {medication.purpose}
            </Text>

            <Pressable
              accessible
              accessibilityRole="button"
              accessibilityState={{ disabled: taken }}
              accessibilityLabel={
                taken
                  ? `${medication.name} already taken today`
                  : `Mark ${medication.name} as taken`
              }
              accessibilityHint={
                taken
                  ? 'This medication has already been marked as taken today.'
                  : 'Records that you took this medication today.'
              }
              disabled={taken}
              onPress={() => markTaken(medication.id, medication.name)}
              style={[
                styles.button,
                {
                  backgroundColor: taken
                    ? activeTheme.success
                    : activeTheme.primary,
                  opacity: taken ? 0.85 : 1,
                },
              ]}
            >
              <Text style={styles.buttonText}>
                {taken ? 'Taken Today' : 'Mark as Taken'}
              </Text>
            </Pressable>
          </AccessibleCard>
        );
      })}
    </ThemedScreen>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: '700',
    marginBottom: spacing.base,
  },
  body: {
    lineHeight: 24,
    marginBottom: spacing.sm,
  },
  button: {
    alignItems: 'center',
    borderRadius: 14,
    justifyContent: 'center',
    marginTop: spacing.md,
    minHeight: 48,
    padding: spacing.md,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
