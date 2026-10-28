import React, { ReactNode } from 'react';
import {
  ScrollView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useCareConnect } from '../context/AppContext';
import { spacing } from '../theme/theme';
import {
  BackgroundVariant,
  ThemeBackground,
} from './ThemeBackground';

type ThemedScreenProps = {
  children: ReactNode;
  backgroundVariant?: BackgroundVariant;
  contentStyle?: StyleProp<ViewStyle>;
  scroll?: boolean;
};

export function ThemedScreen({
  children,
  backgroundVariant = 'home',
  contentStyle,
  scroll = true,
}: ThemedScreenProps) {
  const { activeTheme } = useCareConnect();

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        { backgroundColor: activeTheme.background },
      ]}
    >
      <ThemeBackground variant={backgroundVariant} />

      {scroll ? (
        <ScrollView
          style={styles.foreground}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={[styles.content, contentStyle]}
        >
          {children}
        </ScrollView>
      ) : (
        <View style={[styles.foreground, styles.content, contentStyle]}>
          {children}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  foreground: {
    flex: 1,
    zIndex: 1,
  },
  content: {
    padding: spacing.base,
  },
});
