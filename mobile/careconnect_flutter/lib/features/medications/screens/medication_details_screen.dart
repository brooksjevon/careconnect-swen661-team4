import 'package:flutter/material.dart';

import '../../../app/theme/app_spacing.dart';
import '../models/medication.dart';

class MedicationDetailsScreen extends StatefulWidget {
  final Medication medication;
  final ValueChanged<String> onMarkedTaken;

  const MedicationDetailsScreen({
    super.key,
    required this.medication,
    required this.onMarkedTaken,
  });

  @override
  State<MedicationDetailsScreen> createState() =>
      _MedicationDetailsScreenState();
}

class _MedicationDetailsScreenState extends State<MedicationDetailsScreen> {
  late bool takenToday;

  @override
  void initState() {
    super.initState();
    takenToday = widget.medication.takenToday;
  }

  void markAsTaken() {
    if (takenToday) {
      return;
    }

    setState(() {
      takenToday = true;
    });

    widget.onMarkedTaken(widget.medication.id);

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text('${widget.medication.name} marked as taken.')),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Medication Details')),
      body: SafeArea(
        child: ListView(
          padding: const EdgeInsets.all(AppSpacing.base),
          children: [
            Text(
              widget.medication.name,
              style: Theme.of(context).textTheme.headlineLarge,
            ),
            const SizedBox(height: AppSpacing.sm),
            Text(
              widget.medication.dose,
              style: Theme.of(context).textTheme.bodyLarge,
            ),
            const SizedBox(height: AppSpacing.lg),
            _StatusCard(takenToday: takenToday),
            const SizedBox(height: AppSpacing.lg),
            _InformationCard(
              label: 'Take',
              value: widget.medication.take,
              icon: Icons.medication_outlined,
            ),
            const SizedBox(height: AppSpacing.md),
            _InformationCard(
              label: 'When',
              value: widget.medication.when,
              icon: Icons.schedule_outlined,
            ),
            const SizedBox(height: AppSpacing.md),
            _InformationCard(
              label: 'Used for',
              value: widget.medication.usedFor,
              icon: Icons.favorite_outline,
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
                            'Reading assistance is available for medication information.',
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
                onPressed: takenToday ? null : markAsTaken,
                icon: Icon(
                  takenToday ? Icons.check_circle : Icons.check_circle_outline,
                ),
                label: Text(takenToday ? 'Taken Today' : 'Mark as Taken'),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _StatusCard extends StatelessWidget {
  final bool takenToday;

  const _StatusCard({required this.takenToday});

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(AppSpacing.base),
        child: Row(
          children: [
            Icon(
              takenToday ? Icons.check_circle_outline : Icons.schedule_outlined,
              semanticLabel: takenToday
                  ? 'Medication taken'
                  : 'Medication not taken',
            ),
            const SizedBox(width: AppSpacing.base),
            Expanded(
              child: Text(
                takenToday ? 'Taken today' : 'Not taken yet',
                style: Theme.of(context).textTheme.bodyLarge,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _InformationCard extends StatelessWidget {
  final String label;
  final String value;
  final IconData icon;

  const _InformationCard({
    required this.label,
    required this.value,
    required this.icon,
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
