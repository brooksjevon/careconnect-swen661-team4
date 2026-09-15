import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AccessibleCard } from '../components/AccessibleCard';
import { ReadAloudButton } from '../components/ReadAloudButton';
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

  const readText = scheduleItems
    .map((item) => `${item.time}. ${item.title}. ${item.description}`)
    .join(' ');

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
          Schedule
        </Text>

        <ReadAloudButton text={readText} />

        {scheduleItems.map((item) => {
          const completed = completedIds.includes(item.id);

          return (
            <AccessibleCard
              key={item.id}
              title={`${item.time} - ${item.title}`}
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
                style={[
                  styles.checkButton,
                  { borderColor: activeTheme.primary },
                ]}
              >
                <Text
                  style={[
                    styles.checkText,
                    { color: activeTheme.primary },
                  ]}
                >
                  {completed ? '☑ Complete' : '☐ Mark Complete'}
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
