import 'package:flutter/material.dart';

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

  void changeTheme(CareThemeOption theme) {
    setState(() {
      selectedTheme = theme;
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'CareConnect',
      theme: CareConnectTheme.getTheme(selectedTheme),
      home: CareConnectShell(
        selectedTheme: selectedTheme,
        onThemeChanged: changeTheme,
      ),
    );
  }
}
