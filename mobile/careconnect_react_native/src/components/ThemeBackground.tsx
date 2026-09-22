import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useCareConnect } from '../context/AppContext';
import { ThemeOption } from '../models/types';

export type BackgroundVariant =
  | 'signIn'
  | 'home'
  | 'medications'
  | 'appointments'
  | 'carePlan'
  | 'schedule'
  | 'myHealth'
  | 'accessibility';

type ThemeBackgroundProps = {
  variant?: BackgroundVariant;
};

const themeMotifIcon: Record<ThemeOption, keyof typeof Ionicons.glyphMap> = {
  neutral: 'reader-outline',
  blueGreen: 'water-outline',
  purplePink: 'color-palette-outline',
  kids: 'sunny-outline',
};

const pageMotifIcons: Record<
  BackgroundVariant,
  Array<keyof typeof Ionicons.glyphMap>
> = {
  signIn: ['person-circle-outline', 'shield-checkmark-outline', 'key-outline'],
  home: ['home-outline', 'grid-outline', 'checkmark-circle-outline'],
  medications: ['medkit-outline', 'medical-outline', 'bandage-outline'],
  appointments: ['calendar-outline', 'clipboard-outline', 'chatbubble-ellipses-outline'],
  carePlan: ['checkbox-outline', 'list-outline', 'footsteps-outline'],
  schedule: ['time-outline', 'alarm-outline', 'notifications-outline'],
  myHealth: ['heart-outline', 'pulse-outline', 'fitness-outline'],
  accessibility: ['settings-outline', 'text-outline', 'ear-outline'],
};

export function ThemeBackground({ variant = 'home' }: ThemeBackgroundProps) {
  const { activeTheme, selectedTheme } = useCareConnect();
  const icons = pageMotifIcons[variant];

  return (
    <View
      testID="theme-background"
      pointerEvents="none"
      accessible={false}
      importantForAccessibility="no-hide-descendants"
      accessibilityElementsHidden
      style={StyleSheet.absoluteFill}
    >
      <View
        style={[
          styles.topGlow,
          {
            backgroundColor: activeTheme.softSurface,
            borderColor: activeTheme.border,
          },
        ]}
      />

      <View
        style={[
          styles.bottomGlow,
          {
            backgroundColor: activeTheme.softSurface,
            borderColor: activeTheme.border,
          },
        ]}
      />

      <View
        style={[
          styles.ribbon,
          {
            backgroundColor: activeTheme.softSurface,
          },
        ]}
      />

      <Ionicons
        name={themeMotifIcon[selectedTheme]}
        size={178}
        color={activeTheme.secondary}
        style={[styles.icon, styles.themeIcon]}
      />

      <Ionicons
        name={icons[0]}
        size={138}
        color={activeTheme.primary}
        style={[styles.icon, styles.pageIconOne]}
      />

      <Ionicons
        name={icons[1]}
        size={116}
        color={activeTheme.accent}
        style={[styles.icon, styles.pageIconTwo]}
      />

      <Ionicons
        name={icons[2]}
        size={92}
        color={activeTheme.secondary}
        style={[styles.icon, styles.pageIconThree]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  topGlow: {
    borderRadius: 180,
    borderWidth: 1,
    height: 300,
    opacity: 0.62,
    position: 'absolute',
    right: -100,
    top: -90,
    width: 300,
  },
  bottomGlow: {
    borderRadius: 150,
    borderWidth: 1,
    bottom: 40,
    height: 250,
    left: -105,
    opacity: 0.52,
    position: 'absolute',
    width: 250,
  },
  ribbon: {
    borderRadius: 40,
    height: 90,
    opacity: 0.34,
    position: 'absolute',
    right: -35,
    top: 275,
    transform: [{ rotate: '-18deg' }],
    width: 260,
  },
  icon: {
    opacity: 0.18,
    position: 'absolute',
  },
  themeIcon: {
    right: -24,
    top: 42,
  },
  pageIconOne: {
    left: 16,
    top: 150,
  },
  pageIconTwo: {
    bottom: 145,
    right: 22,
  },
  pageIconThree: {
    bottom: 22,
    left: 38,
  },
});
