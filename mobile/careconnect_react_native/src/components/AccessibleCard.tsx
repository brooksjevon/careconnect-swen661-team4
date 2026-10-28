import React, { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useCareConnect } from '../context/AppContext';
import { spacing, typography } from '../theme/theme';
import { ReadAloudButton } from './ReadAloudButton';

type AccessibleCardProps = {
  title: string;
  description?: string;
  readAloudText?: string;
  children?: ReactNode;
};

export function AccessibleCard({
  title,
  description,
  readAloudText,
  children,
}: AccessibleCardProps) {
  const { activeTheme, textScale, wideSpacing } = useCareConnect();

  const cardPadding = wideSpacing ? spacing.lg : spacing.base;
  const descriptionLineHeight = wideSpacing ? 30 : 24;
  const titleLineHeight = wideSpacing ? 34 : 30;
  const cardReadText = readAloudText ?? `${title}. ${description ?? ''}`;

  return (
    <View
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
        accessibilityRole="header"
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

      <ReadAloudButton
        text={cardReadText}
        label={`Read ${title} Aloud`}
      />

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
