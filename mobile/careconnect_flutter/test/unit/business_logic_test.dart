// Business-logic unit tests — no widget tree, no pumping, no rendering.
// These use test() (not testWidgets()) because they exercise plain Dart
// logic: data model methods, enum-based calculations/lookups, and the
// comparison logic that drives theme/role state updates.
//
// NOTE on scope: several screens (MedicationsScreen, ScheduleScreen,
// CareInstructionsScreen, AppointmentPreparationScreen) hold their toggle
// logic (e.g. "mark medication taken", "toggle schedule item complete",
// "count completed care steps") inside PRIVATE State classes
// (`_MedicationsScreenState`, `_ScheduleItem`, etc). Dart's privacy rules
// mean private classes/members can't be imported and unit-tested from an
// external test file — that logic is only reachable by pumping the widget
// and interacting with it, which is exactly what the existing testWidgets
// suite (appointment_workflow_test.dart, care_instructions_test.dart,
// medication_workflow_test.dart) already does. If true unit coverage of
// those toggle/count calculations is required, the underlying logic would
// need to be extracted into a public model or controller class first.

import 'package:flutter_test/flutter_test.dart';
import 'package:flutter/material.dart';

import 'package:careconnect_flutter/features/medications/models/medication.dart';
import 'package:careconnect_flutter/app/auth/role_scope.dart';
import 'package:careconnect_flutter/features/auth/screens/sign_in_screen.dart';
import 'package:careconnect_flutter/app/accessibility/accessibility_preferences.dart';
import 'package:careconnect_flutter/app/theme/care_theme_tokens.dart';

void main() {
  // ---------------------------------------------------------------------
  // Data model: Medication
  // ---------------------------------------------------------------------
  group('Medication (data model)', () {
    const base = Medication(
      id: '1',
      name: 'Lisinopril',
      dose: '10mg',
      take: '1 tablet',
      when: 'Morning',
      usedFor: 'Blood pressure',
      takenToday: false,
    );

    test('defaults takenToday to false on construction', () {
      expect(base.takenToday, isFalse);
    });

    test('copyWith(takenToday: true) flips the flag and keeps other fields', () {
      final updated = base.copyWith(takenToday: true);

      expect(updated.takenToday, isTrue);
      expect(updated.id, base.id);
      expect(updated.name, base.name);
      expect(updated.dose, base.dose);
      expect(updated.take, base.take);
      expect(updated.when, base.when);
      expect(updated.usedFor, base.usedFor);
    });

    test('copyWith() with no arguments preserves the original value', () {
      final unchanged = base.copyWith();
      expect(unchanged.takenToday, base.takenToday);
    });
  });

  // ---------------------------------------------------------------------
  // Data model: AccessibilityPreferences
  // ---------------------------------------------------------------------
  group('AccessibilityPreferences (data model)', () {
    const defaults = AccessibilityPreferences();

    test('defaults to standard text size, no wide spacing, no read aloud', () {
      expect(defaults.textSize, TextSizeOption.standard);
      expect(defaults.wideSpacing, isFalse);
      expect(defaults.readAloudEnabled, isFalse);
    });

    test('copyWith updates only the requested field', () {
      final updated = defaults.copyWith(textSize: TextSizeOption.extraLarge);

      expect(updated.textSize, TextSizeOption.extraLarge);
      expect(updated.wideSpacing, defaults.wideSpacing);
      expect(updated.readAloudEnabled, defaults.readAloudEnabled);
    });

    test('copyWith can update multiple fields at once', () {
      final updated = defaults.copyWith(
        wideSpacing: true,
        readAloudEnabled: true,
      );

      expect(updated.wideSpacing, isTrue);
      expect(updated.readAloudEnabled, isTrue);
      expect(updated.textSize, defaults.textSize);
    });

    test('copyWith() with no arguments preserves all values', () {
      const custom = AccessibilityPreferences(
        textSize: TextSizeOption.large,
        wideSpacing: true,
        readAloudEnabled: true,
      );
      final unchanged = custom.copyWith();

      expect(unchanged.textSize, custom.textSize);
      expect(unchanged.wideSpacing, custom.wideSpacing);
      expect(unchanged.readAloudEnabled, custom.readAloudEnabled);
    });
  });

  // ---------------------------------------------------------------------
  // Calculations / lookups: TextSizeOption -> scale, label
  // ---------------------------------------------------------------------
  group('TextSizeOption calculations', () {
    test('standard scales to 1.0', () {
      expect(TextSizeOption.standard.scale, 1.0);
    });

    test('large scales to 1.15', () {
      expect(TextSizeOption.large.scale, 1.15);
    });

    test('extraLarge scales to 1.3', () {
      expect(TextSizeOption.extraLarge.scale, 1.3);
    });

    test('scale increases monotonically from standard to extraLarge', () {
      expect(TextSizeOption.standard.scale, lessThan(TextSizeOption.large.scale));
      expect(
        TextSizeOption.large.scale,
        lessThan(TextSizeOption.extraLarge.scale),
      );
    });

    test('labels map to expected display strings', () {
      expect(TextSizeOption.standard.label, 'Standard');
      expect(TextSizeOption.large.label, 'Large');
      expect(TextSizeOption.extraLarge.label, 'Extra Large');
    });
  });

  // ---------------------------------------------------------------------
  // Calculations / lookups: CareConnectRole -> label
  // ---------------------------------------------------------------------
  group('CareConnectRoleLabel calculations', () {
    test('maps patient to "Patient"', () {
      expect(CareConnectRole.patient.label, 'Patient');
    });

    test('maps caregiver to "Caregiver"', () {
      expect(CareConnectRole.caregiver.label, 'Caregiver');
    });

    test('maps provider to "Provider"', () {
      expect(CareConnectRole.provider.label, 'Provider');
    });
  });

  // ---------------------------------------------------------------------
  // State management logic: RoleScope.updateShouldNotify
  // ---------------------------------------------------------------------
  group('RoleScope.updateShouldNotify (state-change logic)', () {
    const child = SizedBox.shrink();

    test('returns true when the role changes', () {
      final oldScope = RoleScope(
        role: CareConnectRole.patient,
        onSignOut: () {},
        child: child,
      );
      final newScope = RoleScope(
        role: CareConnectRole.caregiver,
        onSignOut: () {},
        child: child,
      );

      expect(newScope.updateShouldNotify(oldScope), isTrue);
    });

    test('returns false when the role is unchanged', () {
      final oldScope = RoleScope(
        role: CareConnectRole.provider,
        onSignOut: () {},
        child: child,
      );
      final sameRoleScope = RoleScope(
        role: CareConnectRole.provider,
        onSignOut: () {},
        child: child,
      );

      expect(sameRoleScope.updateShouldNotify(oldScope), isFalse);
    });
  });

  // ---------------------------------------------------------------------
  // State management logic: CareThemeTokens (drives theme switching state)
  // ---------------------------------------------------------------------
  group('CareThemeTokens (theme state logic)', () {
    const tokensA = CareThemeTokens(
      softSurface: Colors.white,
      accent: Colors.blue,
      decorativeAccent: Colors.lightBlue,
      navigationSurface: Colors.grey,
      border: Colors.black,
    );

    const tokensB = CareThemeTokens(
      softSurface: Colors.black,
      accent: Colors.red,
      decorativeAccent: Colors.pink,
      navigationSurface: Colors.brown,
      border: Colors.white,
    );

    test('copyWith updates only the requested field', () {
      final updated = tokensA.copyWith(accent: Colors.green);

      expect(updated.accent, Colors.green);
      expect(updated.softSurface, tokensA.softSurface);
      expect(updated.decorativeAccent, tokensA.decorativeAccent);
      expect(updated.navigationSurface, tokensA.navigationSurface);
      expect(updated.border, tokensA.border);
    });

    test('lerp at t=0 returns the starting tokens\' colors', () {
      final result = tokensA.lerp(tokensB, 0);
      expect(result.accent, Color.lerp(tokensA.accent, tokensB.accent, 0));
    });

    test('lerp at t=1 returns the ending tokens\' colors', () {
      final result = tokensA.lerp(tokensB, 1);
      expect(result.accent, Color.lerp(tokensA.accent, tokensB.accent, 1));
    });

    test('lerp with null other returns the original instance unchanged', () {
      final result = tokensA.lerp(null, 0.5);
      expect(result, same(tokensA));
    });
  });
}
