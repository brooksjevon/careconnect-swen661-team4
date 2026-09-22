import React, { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { AccessibleCard } from '../components/AccessibleCard';
import { ReadAloudButton } from '../components/ReadAloudButton';
import { ThemedScreen } from '../components/ThemedScreen';
import { useCareConnect } from '../context/AppContext';
import { careTasks } from '../data/careData';
import { spacing, typography } from '../theme/theme';
import { announceForAccessibility } from '../utils/accessibilityAnnounce';
import { canFinishCareTask } from '../utils/careLogic';

export function CarePlanScreen() {
  const { activeTheme, textScale } = useCareConnect();
  const task = careTasks[0];
  const [completedStepIds, setCompletedStepIds] = useState<string[]>([]);
  const complete = canFinishCareTask(completedStepIds, task);

  // Tell screen reader users the moment the Finish Instructions button
  // becomes usable, since its own disabled state won't be re-announced
  // unless it currently has focus.
  const previousComplete = useRef(complete);

  useEffect(() => {
    if (complete !== previousComplete.current) {
      announceForAccessibility(
        complete
          ? 'All steps complete. Finish Instructions button is now enabled.'
          : 'Finish Instructions button is disabled until all steps are complete.',
      );
      previousComplete.current = complete;
    }
  }, [complete]);

  const toggleStep = (stepId: string) => {
    setCompletedStepIds((current) =>
      current.includes(stepId)
        ? current.filter((id) => id !== stepId)
        : [...current, stepId],
    );
  };

  const pageReadText = `${task.title}. ${task.instructions
    .map((instruction, index) => `Step ${index + 1}: ${instruction}`)
    .join(' ')}`;

  return (
    <ThemedScreen backgroundVariant="carePlan">
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

      <ReadAloudButton
        text={pageReadText}
        label="Read Care Plan Page Aloud"
      />

      <AccessibleCard
        title={task.title}
        description="Complete the steps in order."
        readAloudText={pageReadText}
      >
        {task.instructions.map((instruction, index) => {
          const stepId = `${task.id}-step-${index}`;
          const checked = completedStepIds.includes(stepId);

          return (
            <Pressable
              key={stepId}
              accessible
              accessibilityRole="checkbox"
              accessibilityState={{ checked }}
              accessibilityLabel={`Step ${index + 1}: ${instruction}`}
              accessibilityHint="Marks this care step as complete or incomplete."
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
          accessible
          accessibilityRole="button"
          accessibilityState={{ disabled: !complete }}
          accessibilityLabel={
            complete ? 'Finish Instructions' : 'Finish Instructions Disabled'
          }
          accessibilityHint={
            complete
              ? 'Marks the care task as finished.'
              : 'Complete all steps above to enable this button.'
          }
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
