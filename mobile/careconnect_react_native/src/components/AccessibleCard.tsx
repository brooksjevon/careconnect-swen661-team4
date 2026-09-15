import React, { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useCareConnect } from '../context/AppContext';
import { spacing, typography } from '../theme/theme';

type AccessibleCardProps = {
  title: string;
  description?: string;
  children?: ReactNode;
};

export function AccessibleCard({
  title,
  description,
  children,
}: AccessibleCardProps) {
  const { activeTheme, textScale, wideSpacing } = useCareConnect();

  const cardPadding = wideSpacing ? spacing.lg : spacing.base;
  const descriptionLineHeight = wideSpacing ? 30 : 24;
  const titleLineHeight = wideSpacing ? 34 : 30;

  return (
    <View
      accessible
      accessibilityRole="summary"
      style={[
        styles.card,
        {
          backgroundColor: activeTheme.surface,
          borderColor: activeTheme.border,
          padding: cardPadding,
        },
      ]}
    >
      <Text
        style={[
          styles.title,
          {
            color: activeTheme.text,
            fontSize: typography.cardTitle * textScale,
            lineHeight: titleLineHeight,
          },
        ]}
      >
        {title}
      </Text>

      {description ? (
        <Text
          style={[
            styles.description,
            {
              color: activeTheme.mutedText,
              fontSize: typography.bodySmall * textScale,
              lineHeight: descriptionLineHeight,
            },
          ]}
        >
          {description}
        </Text>
      ) : null}

      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    borderWidth: 1,
    marginBottom: spacing.base,
  },
  title: {
    fontWeight: '700',
  },
  description: {
    marginTop: spacing.sm,
  },
});
