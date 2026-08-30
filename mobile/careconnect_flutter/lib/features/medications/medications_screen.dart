import 'package:flutter/material.dart';

import '../../app/theme/app_spacing.dart';

class MedicationsScreen extends StatelessWidget {
  const MedicationsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Medications')),
      body: SafeArea(
        child: ListView(
          padding: const EdgeInsets.all(AppSpacing.base),
          children: [
            Text(
              'Medications',
              style: Theme.of(context).textTheme.headlineLarge,
            ),
            const SizedBox(height: AppSpacing.sm),
            Text(
              'Your current medication schedule.',
              style: Theme.of(context).textTheme.bodyLarge,
            ),
            const SizedBox(height: AppSpacing.lg),
            Card(
              child: Padding(
                padding: const EdgeInsets.all(AppSpacing.base),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Lisinopril',
                      style: Theme.of(context).textTheme.titleLarge,
                    ),
                    const SizedBox(height: AppSpacing.sm),
                    Text('10 mg', style: Theme.of(context).textTheme.bodyLarge),
                    const SizedBox(height: AppSpacing.base),
                    Text('When', style: Theme.of(context).textTheme.titleLarge),
                    Text(
                      'Once each day',
                      style: Theme.of(context).textTheme.bodyMedium,
                    ),
                    const SizedBox(height: AppSpacing.md),
                    Text(
                      'Used for',
                      style: Theme.of(context).textTheme.titleLarge,
                    ),
                    Text(
                      'High blood pressure',
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
