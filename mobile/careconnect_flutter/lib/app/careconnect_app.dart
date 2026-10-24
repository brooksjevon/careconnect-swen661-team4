import 'package:flutter/material.dart';

import 'accessibility/accessibility_preferences.dart';
import 'navigation/careconnect_shell.dart';
import 'theme/care_theme_option.dart';
import 'theme/careconnect_theme.dart';

class CareConnectApp extends StatefulWidget {
  const CareConnectApp({super.key});

  @override
  State<CareConnectApp> createState() => _CareConnectAppState();
}

class _CareConnectAppState extends State<CareConnectApp> {
  CareThemeOption selectedTheme = CareThemeOption.neutral;

  AccessibilityPreferences preferences = const AccessibilityPreferences();

  void changeTheme(CareThemeOption theme) {
    setState(() {
      selectedTheme = theme;
    });
  }

  void changePreferences(AccessibilityPreferences value) {
    setState(() {
      preferences = value;
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'CareConnect',
      theme: CareConnectTheme.getTheme(
        selectedTheme,
        wideSpacing: preferences.wideSpacing,
      ),
      builder: (context, child) {
        final media = MediaQuery.of(context);

        return MediaQuery(
          data: media.copyWith(
            textScaler: TextScaler.linear(preferences.textSize.scale),
          ),
          child: child ?? const SizedBox.shrink(),
        );
      },
      home: CareConnectShell(
        selectedTheme: selectedTheme,
        onThemeChanged: changeTheme,
        preferences: preferences,
        onPreferencesChanged: changePreferences,
      ),
    );
  }
}
