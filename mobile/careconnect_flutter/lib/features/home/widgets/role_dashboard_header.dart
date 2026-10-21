import 'package:flutter/material.dart';

import '../../auth/screens/sign_in_screen.dart';

class RoleDashboardHeader extends StatelessWidget {
  final CareConnectRole role;
  final VoidCallback onSwitchUser;

  const RoleDashboardHeader({
    super.key,
    required this.role,
    required this.onSwitchUser,
  });

  String get title {
    switch (role) {
      case CareConnectRole.patient:
        return 'Good morning, Linda';
      case CareConnectRole.caregiver:
        return 'Caregiver Dashboard';
      case CareConnectRole.provider:
        return 'Provider Dashboard';
    }
  }

  String get subtitle {
    switch (role) {
      case CareConnectRole.patient:
        return 'Here is what needs your attention today.';
      case CareConnectRole.caregiver:
        return "Review Linda's care activity and upcoming needs.";
      case CareConnectRole.provider:
        return "Review Linda's medications, appointments, and care plan.";
    }
  }

  String get roleLabel {
    switch (role) {
      case CareConnectRole.patient:
        return 'Patient';
      case CareConnectRole.caregiver:
        return 'Caregiver';
      case CareConnectRole.provider:
        return 'Provider';
    }
  }

  IconData get roleIcon {
    switch (role) {
      case CareConnectRole.patient:
        return Icons.person_outline;
      case CareConnectRole.caregiver:
        return Icons.volunteer_activism_outlined;
      case CareConnectRole.provider:
        return Icons.medical_services_outlined;
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            Icon(roleIcon, color: theme.colorScheme.primary),
            const SizedBox(width: 8),
            Text(roleLabel, style: theme.textTheme.labelLarge),
          ],
        ),

        const SizedBox(height: 12),

        Text(title, style: theme.textTheme.headlineLarge),

        const SizedBox(height: 8),

        Text(subtitle, style: theme.textTheme.bodyLarge),

        const SizedBox(height: 12),

        OutlinedButton.icon(
          onPressed: onSwitchUser,
          icon: const Icon(Icons.switch_account_outlined),
          label: const Text('Switch User'),
        ),
      ],
    );
  }
}
