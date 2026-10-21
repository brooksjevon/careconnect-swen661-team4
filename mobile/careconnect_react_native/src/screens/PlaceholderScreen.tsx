import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AccessibleCard } from '../components/AccessibleCard';
import { useCareConnect } from '../context/AppContext';
import { spacing, typography } from '../theme/theme';

type PlaceholderScreenProps = {
  title: string;
  description: string;
};

export function PlaceholderScreen({
  title,
  description,
}: PlaceholderScreenProps) {
  const { activeTheme, textScale } = useCareConnect();

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
          {title}
        </Text>

        <AccessibleCard title={title} description={description} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    padding: spacing.base,
  },
  title: {
    fontWeight: '700',
    marginBottom: spacing.base,
  },
});
