import React, { useState } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { AccessibleCard } from '../components/AccessibleCard';
import { ReadAloudButton } from '../components/ReadAloudButton';
import { ThemedScreen } from '../components/ThemedScreen';
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

  const pageReadText = `${appointment.provider}. ${appointment.date} at ${appointment.time}. Reason: ${appointment.reason}. Preparation items: ${appointment.prepItems
    .map((item) => item.label)
    .join(' ')}`;

  return (
    <ThemedScreen backgroundVariant="appointments">
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
        Appointments
      </Text>

      <ReadAloudButton
        text={pageReadText}
        label="Read Appointments Page Aloud"
      />

      <AccessibleCard
        title={appointment.provider}
        readAloudText={pageReadText}
      >
        <Text style={[styles.body, { color: activeTheme.text }]}>
          Date: {appointment.date}
        </Text>
        <Text style={[styles.body, { color: activeTheme.text }]}>
          Time: {appointment.time}
        </Text>
        <Text style={[styles.body, { color: activeTheme.text }]}>
          Reason: {appointment.reason}
        </Text>
      </AccessibleCard>

      <AccessibleCard
        title="Appointment Preparation"
        description="Check each item before marking preparation complete."
        readAloudText={pageReadText}
      >
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
              <Text
                style={[
                  styles.body,
                  {
                    color: activeTheme.text,
                    fontSize: typography.bodySmall * textScale,
                  },
                ]}
              >
                {checked ? '☑ ' : '☐ '}
                {item.label}
              </Text>
            </Pressable>
          );
        })}

        <Text
          style={[
            styles.status,
            { color: allChecked ? activeTheme.success : activeTheme.error },
          ]}
        >
          {allChecked ? 'Preparation Complete' : 'Not Complete'}
        </Text>
      </AccessibleCard>
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
  checkRow: {
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: 'center',
    marginBottom: spacing.sm,
    minHeight: 48,
    padding: spacing.md,
  },
  status: {
    fontWeight: '700',
    marginTop: spacing.md,
  },
});
