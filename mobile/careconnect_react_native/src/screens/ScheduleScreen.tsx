import React, { useState } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { AccessibleCard } from '../components/AccessibleCard';
import { ReadAloudButton } from '../components/ReadAloudButton';
import { ThemedScreen } from '../components/ThemedScreen';
import { useCareConnect } from '../context/AppContext';
import { scheduleItems } from '../data/careData';
import { spacing, typography } from '../theme/theme';

export function ScheduleScreen() {
  const { activeTheme, textScale } = useCareConnect();
  const [completedIds, setCompletedIds] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setCompletedIds((current) =>
      current.includes(id)
        ? current.filter((itemId) => itemId !== id)
        : [...current, id],
    );
  };

  const pageReadText = scheduleItems
    .map((item) => `${item.time}. ${item.title}. ${item.description}`)
    .join(' ');

  return (
    <ThemedScreen backgroundVariant="schedule">
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
        Schedule
      </Text>

      <ReadAloudButton
        text={pageReadText}
        label="Read Schedule Page Aloud"
      />

      {scheduleItems.map((item) => {
        const completed = completedIds.includes(item.id);
        const readText = `${item.time}. ${item.title}. ${item.description}`;

        return (
          <AccessibleCard
            key={item.id}
            title={`${item.time} - ${item.title}`}
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
              {item.description}
            </Text>

            <Pressable
              accessibilityRole="checkbox"
              accessibilityState={{ checked: completed }}
              onPress={() => toggleItem(item.id)}
              style={[styles.checkButton, { borderColor: activeTheme.primary }]}
            >
              <Text style={[styles.checkText, { color: activeTheme.primary }]}>
                {completed ? '☑ Complete' : '☐ Mark Complete'}
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
    marginBottom: spacing.md,
  },
  checkButton: {
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1,
    justifyContent: 'center',
    minHeight: 48,
    padding: spacing.md,
  },
  checkText: {
    fontWeight: '700',
  },
});
