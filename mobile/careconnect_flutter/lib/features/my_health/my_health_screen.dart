import 'package:flutter/material.dart';

import '../../app/accessibility/accessibility_preferences.dart';
import '../../app/theme/app_spacing.dart';
import '../../app/theme/care_theme_option.dart';
import 'screens/accessibility_appearance_screen.dart';

class MyHealthScreen extends StatelessWidget {
  final CareThemeOption selectedTheme;

  final ValueChanged<CareThemeOption> onThemeChanged;

  final AccessibilityPreferences preferences;

  final ValueChanged<AccessibilityPreferences> onPreferencesChanged;

  const MyHealthScreen({
    super.key,
    required this.selectedTheme,
    required this.onThemeChanged,
    required this.preferences,
    required this.onPreferencesChanged,
  });

  void openAccessibility(BuildContext context) {
    Navigator.of(context).push(
      MaterialPageRoute<void>(
        builder: (context) {
          return AccessibilityAppearanceScreen(
            selectedTheme: selectedTheme,
            onThemeChanged: onThemeChanged,
            preferences: preferences,
            onPreferencesChanged: onPreferencesChanged,
          );
        },
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('My Health')),
      body: SafeArea(
        child: ListView(
          padding: const EdgeInsets.all(AppSpacing.base),
          children: [
            // Visual heading only – AppBar already announces "My Health"
            ExcludeSemantics(
              child: Text(
                'My Health',
                style: Theme.of(context).textTheme.headlineLarge,
              ),
            ),
            const SizedBox(height: AppSpacing.sm),
            Text(
              'Important health information in one place.',
              style: Theme.of(context).textTheme.bodyLarge,
            ),
            const SizedBox(height: AppSpacing.lg),

            // Health Summary card – heading + one merged summary
            Card(
              child: Padding(
                padding: const EdgeInsets.all(AppSpacing.base),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Semantics(
                      header: true,
                      child: Text(
                        'Health Summary',
                        style: Theme.of(context).textTheme.titleLarge,
                      ),
                    ),
                    const SizedBox(height: AppSpacing.base),
                    Semantics(
                      container: true,
                      label:
                          '2 current medications. '
                          '1 upcoming appointment. '
                          '3 care activities today.',
                      child: ExcludeSemantics(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              '2 current medications',
                              style: Theme.of(context).textTheme.bodyLarge,
                            ),
                            const SizedBox(height: AppSpacing.sm),
                            Text(
                              '1 upcoming appointment',
                              style: Theme.of(context).textTheme.bodyLarge,
                            ),
                            const SizedBox(height: AppSpacing.sm),
                            Text(
                              '3 care activities today',
                              style: Theme.of(context).textTheme.bodyLarge,
                            ),
                          ],
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),

            const SizedBox(height: AppSpacing.lg),

            // Accessibility button
            SizedBox(
              width: double.infinity,
              child: Semantics(
                button: true,
                hint: 'Opens accessibility and appearance settings',
                child: OutlinedButton.icon(
                  onPressed: () {
                    openAccessibility(context);
                  },
                  icon: const ExcludeSemantics(
                    child: Icon(Icons.accessibility_new),
                  ),
                  label: const Text('Accessibility & Appearance'),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}