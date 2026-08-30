import 'package:flutter/material.dart';

import '../../app/theme/app_spacing.dart';

class AppointmentsScreen extends StatelessWidget {
  const AppointmentsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Appointments')),
      body: SafeArea(
        child: ListView(
          padding: const EdgeInsets.all(AppSpacing.base),
          children: [
            Text(
              'Appointments',
              style: Theme.of(context).textTheme.headlineLarge,
            ),
            const SizedBox(height: AppSpacing.sm),
            Text(
              'Your upcoming healthcare visits.',
              style: Theme.of(context).textTheme.bodyLarge,
            ),
            const SizedBox(height: AppSpacing.lg),
            Card(
              child: Padding(
                padding: const EdgeInsets.all(AppSpacing.base),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        const Icon(
                          Icons.calendar_month_outlined,
                          semanticLabel: 'Appointment',
                        ),
                        const SizedBox(width: AppSpacing.sm),
                        Text(
                          'Dr. Patel',
                          style: Theme.of(context).textTheme.titleLarge,
                        ),
                      ],
                    ),
                    const SizedBox(height: AppSpacing.base),
                    Text(
                      'Monday, August 31',
                      style: Theme.of(context).textTheme.bodyLarge,
                    ),
                    Text(
                      '10:30 AM',
                      style: Theme.of(context).textTheme.bodyLarge,
                    ),
                    const SizedBox(height: AppSpacing.sm),
                    Text(
                      'Purpose: Blood pressure follow-up',
                      style: Theme.of(context).textTheme.bodyMedium,
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
