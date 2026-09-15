import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AccessibleCard } from '../components/AccessibleCard';
import { ReadAloudButton } from '../components/ReadAloudButton';
import { useCareConnect } from '../context/AppContext';
import { medications } from '../data/careData';
import { spacing, typography } from '../theme/theme';

export function MedicationsScreen() {
  const { activeTheme, textScale } = useCareConnect();
  const [takenIds, setTakenIds] = useState<string[]>([]);

  const markTaken = (id: string) => {
    setTakenIds((current) =>
      current.includes(id) ? current : [...current, id],
    );
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: activeTheme.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text accessibilityRole="header" style={[styles.title, { color: activeTheme.primary, fontSize: typography.screenTitle * textScale }]}>
          Medications
        </Text>

        {medications.map((medication) => {
          const taken = takenIds.includes(medication.id);
          const readText = `${medication.name}, ${medication.dose}. ${medication.take}. ${medication.when}. ${medication.purpose}.`;

          return (
            <AccessibleCard key={medication.id} title={`${medication.name} - ${medication.dose}`}>
              <Text style={[styles.body, { color: activeTheme.text, fontSize: typography.bodySmall * textScale }]}>
                Take: {medication.take}
              </Text>
              <Text style={[styles.body, { color: activeTheme.text, fontSize: typography.bodySmall * textScale }]}>
                When: {medication.when}
              </Text>
              <Text style={[styles.body, { color: activeTheme.text, fontSize: typography.bodySmall * textScale }]}>
                Used for: {medication.purpose}
              </Text>

              <ReadAloudButton text={readText} />

              <Pressable
                accessibilityRole="button"
                accessibilityState={{ disabled: taken }}
                accessibilityLabel={taken ? `${medication.name} already taken today` : `Mark ${medication.name} as taken`}
                disabled={taken}
                onPress={() => markTaken(medication.id)}
                style={[
                  styles.button,
                  {
                    backgroundColor: taken ? activeTheme.success : activeTheme.primary,
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
