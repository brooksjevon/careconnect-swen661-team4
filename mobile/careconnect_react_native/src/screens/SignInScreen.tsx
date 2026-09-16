import React, { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';

import { ReadAloudButton } from '../components/ReadAloudButton';
import { ThemedScreen } from '../components/ThemedScreen';
import { useCareConnect } from '../context/AppContext';
import { CareConnectRole } from '../models/types';
import { spacing, typography } from '../theme/theme';

const roles: CareConnectRole[] = ['patient', 'caregiver', 'provider'];

const roleLabels: Record<CareConnectRole, string> = {
  patient: 'Patient',
  caregiver: 'Caregiver',
  provider: 'Provider',
};

export function SignInScreen() {
  const { signIn, activeTheme, textScale } = useCareConnect();

  const [selectedRole, setSelectedRole] =
    useState<CareConnectRole>('patient');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [showErrors, setShowErrors] = useState(false);

  const submit = () => {
    if (!email.trim() || !password.trim()) {
      setShowErrors(true);
      return;
    }

    signIn(selectedRole);
  };

  const readText =
    'CareConnect sign in. Choose Patient, Caregiver, or Provider. Enter your email and password. Then press the sign in button.';

  return (
    <ThemedScreen backgroundVariant="signIn" contentStyle={styles.content}>
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
        CareConnect
      </Text>

      <Text
        style={[
          styles.subtitle,
          {
            color: activeTheme.text,
            fontSize: typography.body * textScale,
          },
        ]}
      >
        Sign in to continue
      </Text>

      <ReadAloudButton text={readText} label="Read Sign-In Aloud" />

      <Text
        style={[
          styles.sectionTitle,
          {
            color: activeTheme.text,
            fontSize: typography.sectionTitle * textScale,
          },
        ]}
      >
        I am a...
      </Text>

      {roles.map((role) => {
        const selected = role === selectedRole;

        return (
          <Pressable
            key={role}
            accessibilityRole="button"
            accessibilityState={{ selected }}
            accessibilityLabel={`${roleLabels[role]} sign-in option`}
            onPress={() => setSelectedRole(role)}
            style={[
              styles.roleButton,
              {
                backgroundColor: selected
                  ? activeTheme.softSurface
                  : activeTheme.surface,
                borderColor: selected
                  ? activeTheme.primary
                  : activeTheme.border,
                borderWidth: selected ? 2 : 1,
              },
            ]}
          >
            <Text
              style={[
                styles.roleText,
                {
                  color: activeTheme.text,
                  fontSize: typography.body * textScale,
                },
              ]}
            >
              {selected ? '● ' : '○ '}
              {roleLabels[role]}
            </Text>
          </Pressable>
        );
      })}

      <TextInput
        accessibilityLabel="Email"
        placeholder="Email"
        placeholderTextColor={activeTheme.mutedText}
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        style={[
          styles.input,
          {
            backgroundColor: activeTheme.surface,
            borderColor: activeTheme.border,
            color: activeTheme.text,
            fontSize: typography.bodySmall * textScale,
          },
        ]}
      />

      {showErrors && !email.trim() ? (
        <Text
          accessibilityRole="alert"
          style={[styles.error, { color: activeTheme.error }]}
        >
          Enter your email.
        </Text>
      ) : null}

      <TextInput
        accessibilityLabel="Password"
        placeholder="Password"
        placeholderTextColor={activeTheme.mutedText}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={[
          styles.input,
          {
            backgroundColor: activeTheme.surface,
            borderColor: activeTheme.border,
            color: activeTheme.text,
            fontSize: typography.bodySmall * textScale,
          },
        ]}
      />

      {showErrors && !password.trim() ? (
        <Text
          accessibilityRole="alert"
          style={[styles.error, { color: activeTheme.error }]}
        >
          Enter your password.
        </Text>
      ) : null}

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Sign in as ${roleLabels[selectedRole]}`}
        onPress={submit}
        style={[
          styles.primaryButton,
          { backgroundColor: activeTheme.primary },
        ]}
      >
        <Text style={styles.primaryButtonText}>
          Sign In as {roleLabels[selectedRole]}
        </Text>
      </Pressable>
    </ThemedScreen>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.lg,
  },
  title: {
    fontWeight: '700',
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    marginBottom: spacing.base,
    textAlign: 'center',
  },
  sectionTitle: {
    fontWeight: '700',
    marginBottom: spacing.md,
    marginTop: spacing.lg,
  },
  roleButton: {
    borderRadius: 16,
    justifyContent: 'center',
    marginBottom: spacing.md,
    minHeight: 64,
    padding: spacing.base,
  },
  roleText: {
    fontWeight: '600',
  },
  input: {
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: spacing.sm,
    minHeight: 56,
    paddingHorizontal: spacing.base,
  },
  error: {
    marginBottom: spacing.sm,
  },
  primaryButton: {
    alignItems: 'center',
    borderRadius: 16,
    justifyContent: 'center',
    marginTop: spacing.base,
    minHeight: 56,
    padding: spacing.base,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: typography.bodySmall,
    fontWeight: '700',
  },
});
