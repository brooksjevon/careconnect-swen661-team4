import 'package:flutter/material.dart';

import '../../app/theme/app_colors.dart';
import '../../app/theme/app_spacing.dart';
import '../../app/theme/care_theme_option.dart';

class HomeScreen extends StatelessWidget {
  final CareThemeOption selectedTheme;
  final ValueChanged<CareThemeOption> onThemeChanged;

  const HomeScreen({
    super.key,
    required this.selectedTheme,
    required this.onThemeChanged,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('CareConnect'),
        actions: [
          TextButton.icon(
            onPressed: () {
              _showThemeSelector(context);
            },
            icon: const Icon(Icons.palette_outlined),
            label: const Text('Theme'),
          ),
          const SizedBox(width: AppSpacing.xs),
          TextButton.icon(
            onPressed: () {
              _showHelpMessage(context);
            },
            icon: const Icon(Icons.support_agent_outlined),
            label: const Text('Help'),
          ),
          const SizedBox(width: AppSpacing.sm),
        ],
      ),
      body: SafeArea(
        child: ListView(
          padding: const EdgeInsets.all(AppSpacing.base),
          children: [
            Text(
              'Good morning, Linda',
              style: Theme.of(context).textTheme.headlineLarge,
            ),
            const SizedBox(height: AppSpacing.sm),
            Text(
              'Here is what needs your attention today.',
              style: Theme.of(context).textTheme.bodyLarge,
            ),
            const SizedBox(height: AppSpacing.xl),
            _sectionHeading(context, 'Next Important Action'),
            const SizedBox(height: AppSpacing.md),
            _buildNextActionCard(context),
            const SizedBox(height: AppSpacing.xl),
            _sectionHeading(context, 'Today'),
            const SizedBox(height: AppSpacing.md),
            _buildAppointmentCard(context),
            const SizedBox(height: AppSpacing.md),
            _buildCareTaskCard(context),
            const SizedBox(height: AppSpacing.xl),
            _buildReminderCard(context),
            const SizedBox(height: AppSpacing.xl),
          ],
        ),
      ),
    );
  }

  Widget _sectionHeading(BuildContext context, String title) {
    return Text(title, style: Theme.of(context).textTheme.headlineMedium);
  }

  Widget _buildNextActionCard(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;

    return Container(
      padding: const EdgeInsets.all(AppSpacing.base),
      decoration: BoxDecoration(
        color: colorScheme.primaryContainer,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: colorScheme.primary.withValues(alpha: 0.25)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(
                Icons.medication_outlined,
                color: colorScheme.primary,
                size: 32,
                semanticLabel: 'Medication',
              ),
              const SizedBox(width: AppSpacing.sm),
              Text('Medication', style: Theme.of(context).textTheme.titleLarge),
            ],
          ),
          const SizedBox(height: AppSpacing.lg),
          Text('Lisinopril', style: Theme.of(context).textTheme.headlineMedium),
          const SizedBox(height: AppSpacing.xs),
          Text('10 mg', style: Theme.of(context).textTheme.bodyLarge),
          const SizedBox(height: AppSpacing.base),
          _informationRow(context, label: 'Take', value: '1 tablet'),
          const SizedBox(height: AppSpacing.sm),
          _informationRow(context, label: 'When', value: 'Once each day'),
          const SizedBox(height: AppSpacing.lg),
          SizedBox(
            width: double.infinity,
            child: FilledButton.icon(
              onPressed: () {
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(
                    content: Text('Medication details will open here.'),
                  ),
                );
              },
              icon: const Icon(Icons.arrow_forward),
              label: const Text('View Medication'),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildAppointmentCard(BuildContext context) {
    return Card(
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
                Text(
                  'Appointment',
                  style: Theme.of(context).textTheme.titleLarge,
                ),
              ],
            ),
            const SizedBox(height: AppSpacing.base),
            Text('Dr. Patel', style: Theme.of(context).textTheme.titleLarge),
            const SizedBox(height: AppSpacing.sm),
            Text(
              'Monday, August 31',
              style: Theme.of(context).textTheme.bodyLarge,
            ),
            Text('10:30 AM', style: Theme.of(context).textTheme.bodyLarge),
            const SizedBox(height: AppSpacing.sm),
            Text(
              'Purpose: Blood pressure follow-up',
              style: Theme.of(context).textTheme.bodyMedium,
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildCareTaskCard(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(AppSpacing.base),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Icon(Icons.checklist_outlined, semanticLabel: 'Care task'),
            const SizedBox(width: AppSpacing.base),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Care Task',
                    style: Theme.of(context).textTheme.titleLarge,
                  ),
                  const SizedBox(height: AppSpacing.sm),
                  Text(
                    'Morning medication',
                    style: Theme.of(context).textTheme.bodyLarge,
                  ),
                  const SizedBox(height: AppSpacing.sm),
                  Row(
                    children: [
                      const Icon(
                        Icons.check_circle_outline,
                        semanticLabel: 'Complete',
                      ),
                      const SizedBox(width: AppSpacing.sm),
                      Text(
                        'Status: Complete',
                        style: Theme.of(context).textTheme.bodyMedium,
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

  Widget _buildReminderCard(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(AppSpacing.base),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Icon(Icons.notifications_outlined, semanticLabel: 'Reminder'),
            const SizedBox(width: AppSpacing.base),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Reminder',
                    style: Theme.of(context).textTheme.titleLarge,
                  ),
                  const SizedBox(height: AppSpacing.sm),
                  Text(
                    'Your appointment is tomorrow at 10:30 AM.',
                    style: Theme.of(context).textTheme.bodyLarge,
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _informationRow(
    BuildContext context, {
    required String label,
    required String value,
  }) {
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

  void _showThemeSelector(BuildContext context) {
    showModalBottomSheet<void>(
      context: context,
      showDragHandle: true,
      isScrollControlled: true,
      builder: (bottomSheetContext) {
        return SafeArea(
          child: Padding(
            padding: const EdgeInsets.all(AppSpacing.base),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Choose Your Theme',
                  style: Theme.of(context).textTheme.headlineMedium,
                ),
                const SizedBox(height: AppSpacing.sm),
                Text(
                  'Choose the appearance that works best for you.',
                  style: Theme.of(context).textTheme.bodyMedium,
                ),
                const SizedBox(height: AppSpacing.lg),

                _ThemeOptionTile(
                  title: 'Neutral',
                  selected: selectedTheme == CareThemeOption.neutral,
                  colors: const [
                    AppColors.neutralPrimary,
                    AppColors.neutralSecondary,
                    AppColors.neutralSoftSurface,
                  ],
                  onTap: () {
                    Navigator.pop(bottomSheetContext);
                    onThemeChanged(CareThemeOption.neutral);
                  },
                ),

                _ThemeOptionTile(
                  title: 'Blue & Green',
                  selected: selectedTheme == CareThemeOption.blueGreen,
                  colors: const [
                    AppColors.blueGreenPrimary,
                    AppColors.blueGreenSecondary,
                    AppColors.blueGreenAccent,
                  ],
                  onTap: () {
                    Navigator.pop(bottomSheetContext);
                    onThemeChanged(CareThemeOption.blueGreen);
                  },
                ),

                _ThemeOptionTile(
                  title: 'Purple & Pink',
                  selected: selectedTheme == CareThemeOption.purplePink,
                  colors: const [
                    AppColors.purplePinkPrimary,
                    AppColors.purplePinkSecondary,
                    AppColors.purplePinkAccent,
                  ],
                  onTap: () {
                    Navigator.pop(bottomSheetContext);
                    onThemeChanged(CareThemeOption.purplePink);
                  },
                ),

                _ThemeOptionTile(
                  title: 'Kids',
                  selected: selectedTheme == CareThemeOption.kids,
                  colors: const [
                    AppColors.kidsPrimary,
                    AppColors.kidsSecondary,
                    AppColors.kidsYellow,
                    AppColors.kidsCoral,
                  ],
                  onTap: () {
                    Navigator.pop(bottomSheetContext);
                    onThemeChanged(CareThemeOption.kids);
                  },
                ),
              ],
            ),
          ),
        );
      },
    );
  }

  void _showHelpMessage(BuildContext context) {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Quick Help will be connected to caregiver support.'),
      ),
    );
  }
}

class _ThemeOptionTile extends StatelessWidget {
  final String title;
  final bool selected;
  final List<Color> colors;
  final VoidCallback onTap;

  const _ThemeOptionTile({
    required this.title,
    required this.selected,
    required this.colors,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Semantics(
      button: true,
      selected: selected,
      label: '$title theme',
      child: ListTile(
        contentPadding: const EdgeInsets.symmetric(vertical: AppSpacing.xs),
        onTap: onTap,
        title: Text(title),
        leading: Wrap(
          spacing: 3,
          children: colors
              .map(
                (color) => Container(
                  width: 18,
                  height: 18,
                  decoration: BoxDecoration(
                    color: color,
                    shape: BoxShape.circle,
                    border: Border.all(color: AppColors.border),
                  ),
                ),
              )
              .toList(),
        ),
        trailing: selected
            ? Icon(
                Icons.check_circle,
                color: Theme.of(context).colorScheme.primary,
                semanticLabel: 'Selected',
              )
            : null,
      ),
    );
  }
}
