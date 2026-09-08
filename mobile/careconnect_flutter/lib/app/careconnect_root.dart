import 'package:flutter/material.dart';

import '../features/auth/screens/sign_in_screen.dart';
import 'auth/role_scope.dart';
import 'careconnect_app.dart';
import 'theme/care_theme_option.dart';
import 'theme/careconnect_theme.dart';

class CareConnectRoot extends StatefulWidget {
  const CareConnectRoot({super.key});

  @override
  State<CareConnectRoot> createState() => _CareConnectRootState();
}

class _CareConnectRootState extends State<CareConnectRoot> {
  bool _signedIn = false;
  CareConnectRole? _selectedRole;

  void _handleSignIn(CareConnectRole role) {
    setState(() {
      _selectedRole = role;
      _signedIn = true;
    });
  }

  void _handleSignOut() {
    setState(() {
      _selectedRole = null;
      _signedIn = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    if (_signedIn && _selectedRole != null) {
      return RoleScope(
        role: _selectedRole!,
        onSignOut: _handleSignOut,
        child: const CareConnectApp(),
      );
    }

    return MaterialApp(
      title: 'CareConnect',
      debugShowCheckedModeBanner: false,
      theme: CareConnectTheme.getTheme(CareThemeOption.neutral),
      home: SignInScreen(onSignIn: _handleSignIn),
    );
  }
}
