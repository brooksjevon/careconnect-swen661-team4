import 'package:flutter/material.dart';

import '../../app/theme/app_spacing.dart';
import 'screens/care_instructions_screen.dart';

class CarePlanScreen extends StatefulWidget {
  const CarePlanScreen({super.key});

  @override
  State<CarePlanScreen> createState() => _CarePlanScreenState();
}

class _CarePlanScreenState extends State<CarePlanScreen> {
  bool careInstructionsComplete = false;

  Future<void> openCareInstructions() async {
    final completed = await Navigator.of(context).push<bool>(
      MaterialPageRoute<bool>(
        builder: (context) {
          return const CareInstructionsScreen();
        },
      ),
    );

    if (completed == true && mounted) {
      setState(() {
        careInstructionsComplete = true;
      });
    }
  }

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
              supportingText: 'Your morning medication is complete.',
              icon: Icons.check_circle_outline,
            ),

            const SizedBox(height: AppSpacing.md),

            _CareTask(
              number: '2',
              title: 'Drink water',
              status: careInstructionsComplete ? 'Complete' : 'Next',
              supportingText: careInstructionsComplete
                  ? 'Care instructions complete.'
                  : 'Open the instructions to follow this task step by step.',
              icon: careInstructionsComplete
                  ? Icons.check_circle_outline
                  : Icons.arrow_forward,
              actionLabel: careInstructionsComplete
                  ? 'Review Instructions'
                  : 'View Instructions',
              onAction: openCareInstructions,
            ),

            const SizedBox(height: AppSpacing.md),

            const _CareTask(
              number: '3',
              title: 'Check blood pressure',
              status: 'Later',
              supportingText: 'Complete this task later today.',
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
  final String supportingText;
  final IconData icon;
  final String? actionLabel;
  final VoidCallback? onAction;

  const _CareTask({
    required this.number,
    required this.title,
    required this.status,
    required this.supportingText,
    required this.icon,
    this.actionLabel,
    this.onAction,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(AppSpacing.base),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
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
                  const SizedBox(height: AppSpacing.sm),
                  Text(
                    supportingText,
                    style: Theme.of(context).textTheme.bodyMedium,
                  ),
                  if (actionLabel != null && onAction != null) ...[
                    const SizedBox(height: AppSpacing.base),
                    SizedBox(
                      width: double.infinity,
                      child: OutlinedButton.icon(
                        onPressed: onAction,
                        icon: const Icon(Icons.arrow_forward),
                        label: Text(actionLabel!),
                      ),
                    ),
                  ],
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
