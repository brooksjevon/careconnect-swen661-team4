import 'package:flutter/material.dart';

import '../../../app/theme/app_spacing.dart';

class CareInstructionsScreen extends StatefulWidget {
  const CareInstructionsScreen({super.key});

  @override
  State<CareInstructionsScreen> createState() => _CareInstructionsScreenState();
}

class _CareInstructionsScreenState extends State<CareInstructionsScreen> {
  final List<bool> completedSteps = [false, false, false];

  int get completedCount =>
      completedSteps.where((completed) => completed).length;

  bool get allComplete => completedCount == completedSteps.length;

  void updateStep(int index, bool? value) {
    setState(() {
      completedSteps[index] = value ?? false;
    });
  }

  void finishInstructions() {
    if (!allComplete) {
      return;
    }

    Navigator.of(context).pop(true);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Care Instructions')),
      body: SafeArea(
        child: ListView(
          padding: const EdgeInsets.all(AppSpacing.base),
          children: [
            Text(
              'Drink Water',
              style: Theme.of(context).textTheme.headlineLarge,
            ),
            const SizedBox(height: AppSpacing.sm),
            Text(
              'Follow each step in order.',
              style: Theme.of(context).textTheme.bodyLarge,
            ),

            const SizedBox(height: AppSpacing.lg),

            Card(
              child: Padding(
                padding: const EdgeInsets.all(AppSpacing.base),
                child: Row(
                  children: [
                    const Icon(
                      Icons.format_list_numbered,
                      semanticLabel: 'Progress',
                    ),
                    const SizedBox(width: AppSpacing.base),
                    Expanded(
                      child: Text(
                        '$completedCount of 3 steps complete',
                        style: Theme.of(context).textTheme.bodyLarge,
                      ),
                    ),
                  ],
                ),
              ),
            ),

            const SizedBox(height: AppSpacing.xl),

            Text(
              'What to Do',
              style: Theme.of(context).textTheme.headlineMedium,
            ),

            const SizedBox(height: AppSpacing.md),

            _InstructionStep(
              number: '1',
              text: 'Drink a glass of water.',
              completed: completedSteps[0],
              onChanged: (value) {
                updateStep(0, value);
              },
            ),

            const SizedBox(height: AppSpacing.md),

            _InstructionStep(
              number: '2',
              text: 'Pay attention to how you feel.',
              completed: completedSteps[1],
              onChanged: (value) {
                updateStep(1, value);
              },
            ),

            const SizedBox(height: AppSpacing.md),

            _InstructionStep(
              number: '3',
              text: 'Contact your caregiver if your symptoms get worse.',
              completed: completedSteps[2],
              onChanged: (value) {
                updateStep(2, value);
              },
            ),

            const SizedBox(height: AppSpacing.lg),

            Card(
              child: Padding(
                padding: const EdgeInsets.all(AppSpacing.base),
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Icon(
                      Icons.volume_up_outlined,
                      semanticLabel: 'Read aloud available',
                    ),
                    const SizedBox(width: AppSpacing.base),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Read Aloud',
                            style: Theme.of(context).textTheme.titleLarge,
                          ),
                          const SizedBox(height: AppSpacing.xs),
                          Text(
                            'Reading assistance is available for these care instructions.',
                            style: Theme.of(context).textTheme.bodyMedium,
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),

            const SizedBox(height: AppSpacing.lg),

            SizedBox(
              width: double.infinity,
              child: FilledButton.icon(
                onPressed: allComplete ? finishInstructions : null,
                icon: const Icon(Icons.check_circle_outline),
                label: const Text('Finish Instructions'),
              ),
            ),

            const SizedBox(height: AppSpacing.lg),
          ],
        ),
      ),
    );
  }
}

class _InstructionStep extends StatelessWidget {
  final String number;
  final String text;
  final bool completed;
  final ValueChanged<bool?> onChanged;

  const _InstructionStep({
    required this.number,
    required this.text,
    required this.completed,
    required this.onChanged,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(AppSpacing.sm),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Padding(
              padding: const EdgeInsets.all(AppSpacing.sm),
              child: CircleAvatar(child: Text(number)),
            ),
            Expanded(
              child: CheckboxListTile(
                value: completed,
                onChanged: onChanged,
                title: Text(text, style: Theme.of(context).textTheme.bodyLarge),
                controlAffinity: ListTileControlAffinity.trailing,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
