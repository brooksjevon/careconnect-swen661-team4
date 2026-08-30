import 'package:flutter/material.dart';

import '../../app/theme/app_spacing.dart';

class MyHealthScreen extends StatelessWidget {
  const MyHealthScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('My Health')),
      body: SafeArea(
        child: ListView(
          padding: const EdgeInsets.all(AppSpacing.base),
          children: [
            Text('My Health', style: Theme.of(context).textTheme.headlineLarge),
            const SizedBox(height: AppSpacing.sm),
            Text(
              'Important health information in one place.',
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
                      'Health Summary',
                      style: Theme.of(context).textTheme.titleLarge,
                    ),
                    const SizedBox(height: AppSpacing.base),
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
            const SizedBox(height: AppSpacing.lg),
            SizedBox(
              width: double.infinity,
              child: OutlinedButton.icon(
                onPressed: () {},
                icon: const Icon(Icons.accessibility_new),
                label: const Text('Accessibility & Appearance'),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
