import 'package:flutter/material.dart';

import '../../app/theme/app_spacing.dart';

class CarePlanScreen extends StatelessWidget {
  const CarePlanScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Care Plan')),
      body: SafeArea(
        child: ListView(
          padding: const EdgeInsets.all(AppSpacing.base),
          children: [
            Text('Care Plan', style: Theme.of(context).textTheme.headlineLarge),
            const SizedBox(height: AppSpacing.sm),
            Text(
              'Your care activities for today.',
              style: Theme.of(context).textTheme.bodyLarge,
            ),
            const SizedBox(height: AppSpacing.lg),

            const _CareTask(
              number: '1',
              title: 'Morning medication',
              status: 'Complete',
              icon: Icons.check_circle_outline,
            ),

            const SizedBox(height: AppSpacing.md),

            const _CareTask(
              number: '2',
              title: 'Drink water',
              status: 'Next',
              icon: Icons.arrow_forward,
            ),

            const SizedBox(height: AppSpacing.md),

            const _CareTask(
              number: '3',
              title: 'Check blood pressure',
              status: 'Later',
              icon: Icons.schedule,
            ),
          ],
        ),
      ),
    );
  }
}

class _CareTask extends StatelessWidget {
  final String number;
  final String title;
  final String status;
  final IconData icon;

  const _CareTask({
    required this.number,
    required this.title,
    required this.status,
    required this.icon,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(AppSpacing.base),
        child: Row(
          children: [
            CircleAvatar(child: Text(number)),
            const SizedBox(width: AppSpacing.base),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(title, style: Theme.of(context).textTheme.titleLarge),
                  const SizedBox(height: AppSpacing.sm),
                  Row(
                    children: [
                      Icon(icon, semanticLabel: status),
                      const SizedBox(width: AppSpacing.sm),
                      Expanded(
                        child: Text(
                          'Status: $status',
                          style: Theme.of(context).textTheme.bodyMedium,
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
