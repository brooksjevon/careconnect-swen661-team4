import 'package:flutter/material.dart';

import '../../app/theme/app_spacing.dart';
import 'screens/appointment_preparation_screen.dart';

class AppointmentsScreen extends StatefulWidget {
  const AppointmentsScreen({super.key});

  @override
  State<AppointmentsScreen> createState() => _AppointmentsScreenState();
}

class _AppointmentsScreenState extends State<AppointmentsScreen> {
  bool preparationComplete = false;

  Future<void> openPreparation() async {
    final completed = await Navigator.of(context).push<bool>(
      MaterialPageRoute<bool>(
        builder: (context) {
          return const AppointmentPreparationScreen();
        },
      ),
    );

    if (completed == true && mounted) {
      setState(() {
        preparationComplete = true;
      });
    }
  }

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
                        Expanded(
                          child: Text(
                            'Dr. Patel',
                            style: Theme.of(context).textTheme.titleLarge,
                          ),
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
                    const SizedBox(height: AppSpacing.base),
                    Row(
                      children: [
                        Icon(
                          preparationComplete
                              ? Icons.check_circle_outline
                              : Icons.schedule_outlined,
                          semanticLabel: preparationComplete
                              ? 'Preparation complete'
                              : 'Preparation not complete',
                        ),
                        const SizedBox(width: AppSpacing.sm),
                        Expanded(
                          child: Text(
                            preparationComplete
                                ? 'Preparation: Complete'
                                : 'Preparation: Not complete',
                            style: Theme.of(context).textTheme.bodyMedium,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: AppSpacing.base),
                    SizedBox(
                      width: double.infinity,
                      child: OutlinedButton.icon(
                        onPressed: openPreparation,
                        icon: const Icon(Icons.assignment_outlined),
                        label: Text(
                          preparationComplete
                              ? 'Review Preparation'
                              : 'Prepare for Appointment',
                        ),
                      ),
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
