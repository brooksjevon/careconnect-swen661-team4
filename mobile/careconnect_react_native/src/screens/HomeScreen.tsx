import React from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AccessibleCard } from '../components/AccessibleCard';
import { useCareConnect } from '../context/AppContext';
import {
  appointments,
  caregiverName,
  careTasks,
  medications,
  patientName,
  providerName,
} from '../data/careData';
import { CareConnectRole, ThemeOption } from '../models/types';
import { spacing, themes, typography } from '../theme/theme';

const roleLabels: Record<CareConnectRole, string> = {
  patient: 'Patient',
  caregiver: 'Caregiver',
  provider: 'Provider',
};

function roleTitle(role: CareConnectRole | null) {
  switch (role) {
    case 'caregiver':
      return 'Caregiver Dashboard';
    case 'provider':
      return 'Provider Dashboard';
    case 'patient':
    default:
      return `Good morning, ${patientName}`;
  }
}

function roleSubtitle(role: CareConnectRole | null) {
  switch (role) {
    case 'caregiver':
      return `Review ${patientName}'s care activity and upcoming needs.`;
    case 'provider':
      return `Review ${patientName}'s medications, appointments, and care plan.`;
    case 'patient':
    default:
      return 'Here is what needs your attention today.';
  }
}

export function HomeScreen() {
  const {
    activeTheme,
    role,
    selectedTheme,
    setSelectedTheme,
    signOut,
    textScale,
  } = useCareConnect();

  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  const medication = medications[0];
  const appointment = appointments[0];
  const careTask = careTasks[0];

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        { backgroundColor: activeTheme.background },
      ]}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <View
          style={[
            styles.hero,
            {
              backgroundColor: activeTheme.softSurface,
              borderColor: activeTheme.border,
            },
          ]}
        >
          <Text
            accessibilityRole="header"
            style={[
              styles.heroTitle,
              {
                color: activeTheme.primary,
                fontSize: typography.screenTitle * textScale,
              },
            ]}
          >
            {roleTitle(role)}
          </Text>

          <Text
            style={[
              styles.heroText,
              {
                color: activeTheme.text,
                fontSize: typography.body * textScale,
              },
            ]}
          >
            {roleSubtitle(role)}
          </Text>

          <Text
            style={[
              styles.roleText,
              {
                color: activeTheme.mutedText,
                fontSize: typography.bodySmall * textScale,
              },
            ]}
          >
            Signed in as {role ? roleLabels[role] : 'Patient'}
          </Text>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Switch user"
            onPress={signOut}
            style={[
              styles.secondaryButton,
              { borderColor: activeTheme.primary },
            ]}
          >
            <Text
              style={[
                styles.secondaryButtonText,
                { color: activeTheme.primary },
              ]}
            >
              Switch User
            </Text>
          </Pressable>
        </View>

        <View style={isTablet ? styles.gridTablet : undefined}>
          <AccessibleCard
            title="Next Important Action"
            description={`${medication.name} ${medication.dose}. ${medication.take}. ${medication.when}.`}
          />

          <AccessibleCard
            title="Appointment"
            description={`${appointment.provider}. ${appointment.date} at ${appointment.time}. ${appointment.reason}.`}
          />

          <AccessibleCard
            title="Care Task"
            description={`${careTask.title}. Start with step 1: ${careTask.instructions[0]}`}
          />

          <AccessibleCard
            title="Care Team"
            description={`Caregiver: ${caregiverName}. Provider: ${providerName}.`}
          />
        </View>

        <Text
          style={[
            styles.sectionTitle,
            {
              color: activeTheme.text,
              fontSize: typography.sectionTitle * textScale,
            },
          ]}
        >
          Theme
        </Text>

        {Object.entries(themes).map(([themeKey, themeValue]) => {
          const key = themeKey as ThemeOption;
          const selected = selectedTheme === key;

          return (
            <Pressable
              key={key}
              accessibilityRole="button"
              accessibilityState={{ selected }}
              accessibilityLabel={`${themeValue.name} theme`}
              onPress={() => setSelectedTheme(key)}
              style={[
                styles.themeButton,
                {
                  backgroundColor: selected
                    ? themeValue.softSurface
                    : activeTheme.surface,
                  borderColor: selected
                    ? themeValue.primary
                    : activeTheme.border,
                },
              ]}
            >
              <Text
                style={[
                  styles.themeButtonText,
                  {
                    color: activeTheme.text,
                    fontSize: typography.bodySmall * textScale,
                  },
                ]}
              >
                {selected ? '● ' : '○ '}
                {themeValue.name}
              </Text>
            </Pressable>
          );
        })}
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
  hero: {
    borderRadius: 22,
    borderWidth: 1,
    marginBottom: spacing.lg,
    padding: spacing.lg,
  },
  heroTitle: {
    fontWeight: '700',
    lineHeight: 38,
  },
  heroText: {
    lineHeight: 28,
    marginTop: spacing.sm,
  },
  roleText: {
    marginTop: spacing.md,
  },
  secondaryButton: {
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1,
    marginTop: spacing.base,
    minHeight: 48,
    justifyContent: 'center',
  },
  secondaryButtonText: {
    fontWeight: '700',
  },
  gridTablet: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  sectionTitle: {
    fontWeight: '700',
    marginBottom: spacing.md,
    marginTop: spacing.lg,
  },
  themeButton: {
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: spacing.sm,
    minHeight: 52,
    justifyContent: 'center',
    paddingHorizontal: spacing.base,
  },
  themeButtonText: {
    fontWeight: '600',
  },
});
