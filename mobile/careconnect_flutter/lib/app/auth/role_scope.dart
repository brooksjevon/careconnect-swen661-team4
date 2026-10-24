import 'package:flutter/material.dart';

import '../../features/auth/screens/sign_in_screen.dart';

class RoleScope extends InheritedWidget {
  final CareConnectRole role;
  final VoidCallback onSignOut;

  const RoleScope({
    super.key,
    required this.role,
    required this.onSignOut,
    required super.child,
  });

  static RoleScope of(BuildContext context) {
    final scope = maybeOf(context);

    assert(scope != null, 'RoleScope was not found in the widget tree.');

    return scope!;
  }

  static RoleScope? maybeOf(BuildContext context) {
    return context.dependOnInheritedWidgetOfExactType<RoleScope>();
  }

  @override
  bool updateShouldNotify(RoleScope oldWidget) {
    return role != oldWidget.role;
  }
}
