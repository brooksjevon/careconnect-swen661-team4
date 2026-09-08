import 'package:flutter/material.dart';

import '../../app/theme/app_spacing.dart';
import 'models/medication.dart';
import 'screens/medication_details_screen.dart';

class MedicationsScreen extends StatefulWidget {
  const MedicationsScreen({super.key});

  @override
  State<MedicationsScreen> createState() => _MedicationsScreenState();
}

class _MedicationsScreenState extends State<MedicationsScreen> {
  final List<Medication> medications = [
    const Medication(
      id: 'med-001',
      name: 'Lisinopril',
      dose: '10 mg',
      take: '1 tablet',
      when: 'Once each day',
      usedFor: 'High blood pressure',
    ),
    const Medication(
      id: 'med-002',
      name: 'Amlodipine',
      dose: '5 mg',
      take: '1 tablet',
      when: 'Once each day',
      usedFor: 'High blood pressure',
    ),
  ];

  void markMedicationTaken(String medicationId) {
    final index = medications.indexWhere(
      (medication) => medication.id == medicationId,
    );

    if (index == -1) {
      return;
    }

    setState(() {
      medications[index] = medications[index].copyWith(takenToday: true);
    });
  }

  void openMedicationDetails(Medication medication) {
    Navigator.of(context).push(
      MaterialPageRoute<void>(
        builder: (context) {
          return MedicationDetailsScreen(
            medication: medication,
            onMarkedTaken: markMedicationTaken,
          );
        },
      ),
    );
  }

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
            const SizedBox(height: AppSpacing.xs),
            Text(
              'Select a medication to see simple instructions and details.',
              style: Theme.of(context).textTheme.bodyMedium,
            ),
            const SizedBox(height: AppSpacing.lg),
            ...medications.map((medication) {
              return Padding(
                padding: const EdgeInsets.only(bottom: AppSpacing.md),
                child: _MedicationCard(
                  medication: medication,
                  onViewDetails: () {
                    openMedicationDetails(medication);
                  },
                ),
              );
            }),
          ],
        ),
      ),
    );
  }
}

class _MedicationCard extends StatelessWidget {
  final Medication medication;
  final VoidCallback onViewDetails;

  const _MedicationCard({
    required this.medication,
    required this.onViewDetails,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(AppSpacing.base),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Icon(
                  Icons.medication_outlined,
                  size: 32,
                  semanticLabel: 'Medication',
                ),
                const SizedBox(width: AppSpacing.base),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        medication.name,
                        style: Theme.of(context).textTheme.titleLarge,
                      ),
                      const SizedBox(height: AppSpacing.xs),
                      Text(
                        medication.dose,
                        style: Theme.of(context).textTheme.bodyLarge,
                      ),
                    ],
                  ),
                ),
              ],
            ),
            const SizedBox(height: AppSpacing.base),
            _MedicationField(label: 'Take', value: medication.take),
            const SizedBox(height: AppSpacing.sm),
            _MedicationField(label: 'When', value: medication.when),
            const SizedBox(height: AppSpacing.sm),
            Row(
              children: [
                Icon(
                  medication.takenToday
                      ? Icons.check_circle_outline
                      : Icons.schedule_outlined,
                  semanticLabel: medication.takenToday ? 'Taken' : 'Not taken',
                ),
                const SizedBox(width: AppSpacing.sm),
                Expanded(
                  child: Text(
                    medication.takenToday ? 'Taken today' : 'Not taken yet',
                    style: Theme.of(context).textTheme.bodyMedium,
                  ),
                ),
              ],
            ),
            const SizedBox(height: AppSpacing.base),
            SizedBox(
              width: double.infinity,
              child: OutlinedButton.icon(
                onPressed: onViewDetails,
                icon: const Icon(Icons.arrow_forward),
                label: const Text('View Details'),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _MedicationField extends StatelessWidget {
  final String label;
  final String value;

  const _MedicationField({required this.label, required this.value});

  @override
  Widget build(BuildContext context) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        SizedBox(
          width: 72,
          child: Text(label, style: Theme.of(context).textTheme.titleLarge),
        ),
        const SizedBox(width: AppSpacing.sm),
        Expanded(
          child: Text(value, style: Theme.of(context).textTheme.bodyLarge),
        ),
      ],
    );
  }
}
