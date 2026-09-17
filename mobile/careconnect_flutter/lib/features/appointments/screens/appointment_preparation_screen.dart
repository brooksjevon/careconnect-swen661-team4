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
            // Screen heading
            Semantics(
              header: true,
              child: Text(
                'Get Ready for Your Appointment',
                style: Theme.of(context).textTheme.headlineLarge,
              ),
            ),
            const SizedBox(height: AppSpacing.sm),
            Text(
              'Everything you need is organized into short steps.',
              style: Theme.of(context).textTheme.bodyLarge,
            ),
            const SizedBox(height: AppSpacing.lg),

            const _InformationCard(
              icon: Icons.person_outline,
              label: 'Provider',
              value: 'Dr. Patel',
            ),

            const SizedBox(height: AppSpacing.md),

            const _InformationCard(
              icon: Icons.calendar_month_outlined,
              label: 'When',
              value: 'Monday, August 31 at 10:30 AM',
            ),

            const SizedBox(height: AppSpacing.md),

            const _InformationCard(
              icon: Icons.location_on_outlined,
              label: 'Where',
              value: 'CareConnect Family Clinic, Room 204',
            ),

            const SizedBox(height: AppSpacing.md),

            const _InformationCard(
              icon: Icons.favorite_outline,
              label: 'Purpose',
              value: 'Blood pressure follow-up',
            ),

            const SizedBox(height: AppSpacing.xl),

            // Section heading
            Semantics(
              header: true,
              child: Text(
                'What to Bring',
                style: Theme.of(context).textTheme.headlineMedium,
              ),
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
                    secondary: const ExcludeSemantics(
                      child: Icon(Icons.badge_outlined),
                    ),
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
                    secondary: const ExcludeSemantics(
                      child: Icon(Icons.medication_outlined),
                    ),
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
                    secondary: const ExcludeSemantics(
                      child: Icon(Icons.monitor_heart_outlined),
                    ),
                    controlAffinity: ListTileControlAffinity.trailing,
                  ),
                ],
              ),
            ),

            const SizedBox(height: AppSpacing.xl),

            // Section heading
            Semantics(
              header: true,
              child: Text(
                'Questions to Ask',
                style: Theme.of(context).textTheme.headlineMedium,
              ),
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
                    const ExcludeSemantics(
                      child: Icon(Icons.volume_up_outlined),
                    ),
                    const SizedBox(width: AppSpacing.base),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Semantics(
                            header: true,
                            child: Text(
                              'Read Aloud',
                              style: Theme.of(context).textTheme.titleLarge,
                            ),
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
              child: Semantics(
                button: true,
                hint: 'Marks this appointment as ready',
                child: FilledButton.icon(
                  onPressed: completePreparation,
                  icon: const ExcludeSemantics(
                    child: Icon(Icons.check_circle_outline),
                  ),
                  label: const Text('Mark Preparation Complete'),
                ),
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

  /// Expands common abbreviations so screen readers announce them
  /// correctly. "Dr." would otherwise be read as "drive".
  String _expandAbbreviations(String input) {
    return input
        .replaceAll(RegExp(r'\bDr\.\s*'), 'Doctor ')
        .replaceAll(RegExp(r'\bMr\.\s*'), 'Mister ')
        .replaceAll(RegExp(r'\bMrs\.\s*'), 'Missus ')
        .replaceAll(RegExp(r'\bMs\.\s*'), 'Miss ')
        .replaceAll(RegExp(r'\bSt\.\s*'), 'Street ');
  }

  @override
  Widget build(BuildContext context) {
    return Semantics(
      label: '$label: ${_expandAbbreviations(value)}',
      child: Card(
        child: Padding(
          padding: const EdgeInsets.all(AppSpacing.base),
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              ExcludeSemantics(child: Icon(icon)),
              const SizedBox(width: AppSpacing.base),
              Expanded(
                child: ExcludeSemantics(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        label,
                        style: Theme.of(context).textTheme.titleLarge,
                      ),
                      const SizedBox(height: AppSpacing.xs),
                      Text(
                        value,
                        style: Theme.of(context).textTheme.bodyLarge,
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
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
    return MergeSemantics(
      child: Card(
        child: Padding(
          padding: const EdgeInsets.all(AppSpacing.base),
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              ExcludeSemantics(
                child: CircleAvatar(child: Text(number)),
              ),
              const SizedBox(width: AppSpacing.base),
              Expanded(
                child: Text(
                  'Question $number: $question',
                  style: Theme.of(context).textTheme.bodyLarge,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}