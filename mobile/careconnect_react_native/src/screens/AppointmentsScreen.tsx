import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AccessibleCard } from '../components/AccessibleCard';
import { ReadAloudButton } from '../components/ReadAloudButton';
import { useCareConnect } from '../context/AppContext';
import { appointments } from '../data/careData';
import { spacing, typography } from '../theme/theme';

export function AppointmentsScreen() {
  const { activeTheme, textScale } = useCareConnect();
  const appointment = appointments[0];
  const [checkedIds, setCheckedIds] = useState<string[]>([]);
  const allChecked = appointment.prepItems.every((item) =>
    checkedIds.includes(item.id),
  );

  const togglePrep = (id: string) => {
    setCheckedIds((current) =>
      current.includes(id)
        ? current.filter((itemId) => itemId !== id)
        : [...current, id],
    );
  };

  const readText = `${appointment.provider}. ${appointment.date} at ${appointment.time}. Reason: ${appointment.reason}. Preparation items: ${appointment.prepItems
    .map((item) => item.label)
    .join(' ')}`;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: activeTheme.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text accessibilityRole="header" style={[styles.title, { color: activeTheme.primary, fontSize: typography.screenTitle * textScale }]}>
          Appointments
        </Text>

        <AccessibleCard title={appointment.provider}>
          <Text style={[styles.body, { color: activeTheme.text, fontSize: typography.bodySmall * textScale }]}>
            Date: {appointment.date}
          </Text>
          <Text style={[styles.body, { color: activeTheme.text, fontSize: typography.bodySmall * textScale }]}>
            Time: {appointment.time}
          </Text>
          <Text style={[styles.body, { color: activeTheme.text, fontSize: typography.bodySmall * textScale }]}>
            Reason: {appointment.reason}
          </Text>

          <ReadAloudButton text={readText} />
        </AccessibleCard>

        <AccessibleCard title="Appointment Preparation" description="Check each item before marking preparation complete.">
          {appointment.prepItems.map((item) => {
            const checked = checkedIds.includes(item.id);

            return (
              <Pressable
                key={item.id}
                accessibilityRole="checkbox"
                accessibilityState={{ checked }}
                onPress={() => togglePrep(item.id)}
                style={[styles.checkRow, { borderColor: activeTheme.border }]}
              >
                <Text style={[styles.body, { color: activeTheme.text, fontSize: typography.bodySmall * textScale }]}>
                  {checked ? '☑ ' : '☐ '}
                  {item.label}
                </Text>
              </Pressable>
            );
          })}

          <Text style={[styles.status, { color: allChecked ? activeTheme.success : activeTheme.error }]}>
            {allChecked ? 'Preparation Complete' : 'Not Complete'}
          </Text>
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
  body: {
    lineHeight: 24,
    marginBottom: spacing.sm,
  },
  checkRow: {
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: spacing.sm,
    minHeight: 48,
    justifyContent: 'center',
    padding: spacing.md,
  },
  status: {
    fontWeight: '700',
    marginTop: spacing.md,
  },
});
