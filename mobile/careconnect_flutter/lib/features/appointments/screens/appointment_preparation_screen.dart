import 'package:flutter/material.dart';

import '../../../app/theme/app_spacing.dart';

class AppointmentPreparationScreen extends StatefulWidget {
  const AppointmentPreparationScreen({super.key});

  @override
  State<AppointmentPreparationScreen> createState() =>
      _AppointmentPreparationScreenState();
}

class _AppointmentPreparationScreenState
    extends State<AppointmentPreparationScreen> {
  bool photoIdReady = false;
  bool medicationListReady = false;
  bool bloodPressureLogReady = false;

  void completePreparation() {
    Navigator.of(context).pop(true);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Appointment Preparation')),
      body: SafeArea(
        child: ListView(
          padding: const EdgeInsets.all(AppSpacing.base),
          children: [
            Text(
              'Get Ready for Your Appointment',
              style: Theme.of(context).textTheme.headlineLarge,
            ),
            const SizedBox(height: AppSpacing.sm),
            Text(
              'Everything you need is organized into short steps.',
              style: Theme.of(context).textTheme.bodyLarge,
            ),
            const SizedBox(height: AppSpacing.lg),

            _InformationCard(
              icon: Icons.person_outline,
              label: 'Provider',
              value: 'Dr. Patel',
            ),

            const SizedBox(height: AppSpacing.md),

            _InformationCard(
              icon: Icons.calendar_month_outlined,
              label: 'When',
              value: 'Monday, August 31 at 10:30 AM',
            ),

            const SizedBox(height: AppSpacing.md),

            _InformationCard(
              icon: Icons.location_on_outlined,
              label: 'Where',
              value: 'CareConnect Family Clinic, Room 204',
            ),

            const SizedBox(height: AppSpacing.md),

            _InformationCard(
              icon: Icons.favorite_outline,
              label: 'Purpose',
              value: 'Blood pressure follow-up',
            ),

            const SizedBox(height: AppSpacing.xl),

            Text(
              'What to Bring',
              style: Theme.of(context).textTheme.headlineMedium,
            ),

            const SizedBox(height: AppSpacing.sm),

            Text(
              'Check each item when it is ready.',
              style: Theme.of(context).textTheme.bodyMedium,
            ),

            const SizedBox(height: AppSpacing.md),

            Card(
              child: Column(
                children: [
                  CheckboxListTile(
                    value: photoIdReady,
                    onChanged: (value) {
                      setState(() {
                        photoIdReady = value ?? false;
                      });
                    },
                    title: const Text('Photo ID'),
                    secondary: const Icon(Icons.badge_outlined),
                    controlAffinity: ListTileControlAffinity.trailing,
                  ),
                  const Divider(height: 1),
                  CheckboxListTile(
                    value: medicationListReady,
                    onChanged: (value) {
                      setState(() {
                        medicationListReady = value ?? false;
                      });
                    },
                    title: const Text('Medication list'),
                    secondary: const Icon(Icons.medication_outlined),
                    controlAffinity: ListTileControlAffinity.trailing,
                  ),
                  const Divider(height: 1),
                  CheckboxListTile(
                    value: bloodPressureLogReady,
                    onChanged: (value) {
                      setState(() {
                        bloodPressureLogReady = value ?? false;
                      });
                    },
                    title: const Text('Blood pressure log'),
                    secondary: const Icon(Icons.monitor_heart_outlined),
                    controlAffinity: ListTileControlAffinity.trailing,
                  ),
                ],
              ),
            ),

            const SizedBox(height: AppSpacing.xl),

            Text(
              'Questions to Ask',
              style: Theme.of(context).textTheme.headlineMedium,
            ),

            const SizedBox(height: AppSpacing.md),

            const _QuestionCard(
              number: '1',
              question: 'Is my blood pressure improving?',
            ),

            const SizedBox(height: AppSpacing.md),

            const _QuestionCard(
              number: '2',
              question: 'Do I need any medication changes?',
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
                            'Reading assistance is available for your appointment information.',
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
                onPressed: completePreparation,
                icon: const Icon(Icons.check_circle_outline),
                label: const Text('Mark Preparation Complete'),
              ),
            ),

            const SizedBox(height: AppSpacing.lg),
          ],
        ),
      ),
    );
  }
}

class _InformationCard extends StatelessWidget {
  final IconData icon;
  final String label;
  final String value;

  const _InformationCard({
    required this.icon,
    required this.label,
    required this.value,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(AppSpacing.base),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Icon(icon, semanticLabel: label),
            const SizedBox(width: AppSpacing.base),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(label, style: Theme.of(context).textTheme.titleLarge),
                  const SizedBox(height: AppSpacing.xs),
                  Text(value, style: Theme.of(context).textTheme.bodyLarge),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _QuestionCard extends StatelessWidget {
  final String number;
  final String question;

  const _QuestionCard({required this.number, required this.question});

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
              child: Text(
                question,
                style: Theme.of(context).textTheme.bodyLarge,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
