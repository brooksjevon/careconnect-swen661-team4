import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AccessibleCard } from '../components/AccessibleCard';
import { ReadAloudButton } from '../components/ReadAloudButton';
import { useCareConnect } from '../context/AppContext';
import { careTasks } from '../data/careData';
import { spacing, typography } from '../theme/theme';
import { canFinishCareTask } from '../utils/careLogic';

export function CarePlanScreen() {
  const { activeTheme, textScale } = useCareConnect();
  const task = careTasks[0];
  const [completedStepIds, setCompletedStepIds] = useState<string[]>([]);
  const complete = canFinishCareTask(completedStepIds, task);

  const toggleStep = (stepId: string) => {
    setCompletedStepIds((current) =>
      current.includes(stepId)
        ? current.filter((id) => id !== stepId)
        : [...current, stepId],
    );
  };

  const readText = `${task.title}. ${task.instructions
    .map((instruction, index) => `Step ${index + 1}: ${instruction}`)
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
          Care Plan
        </Text>

        <AccessibleCard
          title={task.title}
          description="Complete the steps in order."
        >
          <ReadAloudButton text={readText} />

          {task.instructions.map((instruction, index) => {
            const stepId = `${task.id}-step-${index}`;
            const checked = completedStepIds.includes(stepId);

            return (
              <Pressable
                key={stepId}
                accessibilityRole="checkbox"
                accessibilityState={{ checked }}
                onPress={() => toggleStep(stepId)}
                style={[styles.stepRow, { borderColor: activeTheme.border }]}
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
                  Step {index + 1}: {instruction}
                </Text>
              </Pressable>
            );
          })}

          <Pressable
            accessibilityRole="button"
            accessibilityState={{ disabled: !complete }}
            disabled={!complete}
            style={[
              styles.button,
              {
                backgroundColor: complete
                  ? activeTheme.primary
                  : activeTheme.softSurface,
                borderColor: activeTheme.border,
              },
            ]}
          >
            <Text
              style={[
                styles.buttonText,
                { color: complete ? '#FFFFFF' : activeTheme.mutedText },
              ]}
            >
              {complete
                ? 'Finish Instructions'
                : 'Finish Instructions Disabled'}
            </Text>
          </Pressable>
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
  },
  stepRow: {
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: 'center',
    marginBottom: spacing.sm,
    minHeight: 48,
    padding: spacing.md,
  },
  button: {
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1,
    justifyContent: 'center',
    marginTop: spacing.md,
    minHeight: 48,
    padding: spacing.md,
  },
  buttonText: {
    fontWeight: '700',
  },
});
