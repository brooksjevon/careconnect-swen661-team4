import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';

import '../../app/theme/app_spacing.dart';
import '../../app/theme/care_theme_option.dart';
import '../../app/theme/care_theme_tokens.dart';
import '../../app/theme/theme_preview_asset.dart';
import '../reminders/schedule_screen.dart';

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
            style: TextButton.styleFrom(foregroundColor: Colors.white),
            icon: const Icon(Icons.palette_outlined),
            label: const Text('Theme'),
          ),
          const SizedBox(width: AppSpacing.xs),
          IconButton(
            onPressed: () {
              _showHelpMessage(context);
            },
            color: Colors.white,
            icon: const Icon(Icons.support_agent_outlined),
            tooltip: 'Help',
          ),
          const SizedBox(width: AppSpacing.sm),
        ],
      ),
      body: SafeArea(
        child: ListView(
          padding: const EdgeInsets.all(AppSpacing.base),
          children: [
            _buildThemeHero(context),

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

            const SizedBox(height: AppSpacing.md),

            _buildReminderCard(context),

            const SizedBox(height: AppSpacing.md),

            SizedBox(
              width: double.infinity,
              child: OutlinedButton.icon(
                onPressed: () {
                  Navigator.of(context).push(
                    MaterialPageRoute<void>(
                      builder: (context) {
                        return const ScheduleScreen();
                      },
                    ),
                  );
                },
                icon: const Icon(Icons.calendar_view_day_outlined),
                label: const Text('View Schedule'),
              ),
            ),

            const SizedBox(height: AppSpacing.xl),
          ],
        ),
      ),
    );
  }

  Widget _buildThemeHero(BuildContext context) {
    final tokens = Theme.of(context).extension<CareThemeTokens>()!;

    return Container(
      decoration: BoxDecoration(
        color: tokens.softSurface,
        borderRadius: BorderRadius.circular(22),
        border: Border.all(color: tokens.border),
      ),
      clipBehavior: Clip.antiAlias,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          AspectRatio(
            aspectRatio: 2,
            child: SvgPicture.asset(
              ThemePreviewAsset.forTheme(selectedTheme),
              fit: BoxFit.cover,
            ),
          ),

          Padding(
            padding: const EdgeInsets.all(AppSpacing.base),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
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

                const SizedBox(height: AppSpacing.md),

                Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: AppSpacing.md,
                    vertical: AppSpacing.sm,
                  ),
                  decoration: BoxDecoration(
                    color: tokens.accent.withValues(alpha: 0.20),
                    borderRadius: BorderRadius.circular(999),
                  ),
                  child: Text(
                    '${_themeName(selectedTheme)} theme',
                    style: Theme.of(context).textTheme.bodyMedium,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  String _themeName(CareThemeOption theme) {
    switch (theme) {
      case CareThemeOption.neutral:
        return 'Neutral';

      case CareThemeOption.blueGreen:
        return 'Blue & Green';

      case CareThemeOption.purplePink:
        return 'Purple & Pink';

      case CareThemeOption.kids:
        return 'Kids';
    }
  }

  Widget _sectionHeading(BuildContext context, String title) {
    return Text(title, style: Theme.of(context).textTheme.headlineMedium);
  }

  Widget _buildNextActionCard(BuildContext context) {
    final tokens = Theme.of(context).extension<CareThemeTokens>()!;

    final colorScheme = Theme.of(context).colorScheme;

    return Container(
      padding: const EdgeInsets.all(AppSpacing.base),
      decoration: BoxDecoration(
        color: tokens.softSurface,
        borderRadius: BorderRadius.circular(18),
        border: Border.all(
          color: tokens.decorativeAccent.withValues(alpha: 0.50),
          width: 1.5,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Container(
                width: 48,
                height: 48,
                decoration: BoxDecoration(
                  color: tokens.accent.withValues(alpha: 0.25),
                  borderRadius: BorderRadius.circular(14),
                ),
                child: Icon(
                  Icons.medication_outlined,
                  color: colorScheme.primary,
                  semanticLabel: 'Medication',
                ),
              ),

              const SizedBox(width: AppSpacing.md),

              Expanded(
                child: Text(
                  'Medication',
                  style: Theme.of(context).textTheme.titleLarge,
                ),
              ),
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
                      Expanded(
                        child: Text(
                          'Status: Complete',
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
                  label: 'Neutral',
                  theme: CareThemeOption.neutral,
                  selected: selectedTheme == CareThemeOption.neutral,
                  onTap: () {
                    Navigator.pop(bottomSheetContext);
                    onThemeChanged(CareThemeOption.neutral);
                  },
                ),

                _ThemeOptionTile(
                  label: 'Blue & Green',
                  theme: CareThemeOption.blueGreen,
                  selected: selectedTheme == CareThemeOption.blueGreen,
                  onTap: () {
                    Navigator.pop(bottomSheetContext);
                    onThemeChanged(CareThemeOption.blueGreen);
                  },
                ),

                _ThemeOptionTile(
                  label: 'Purple & Pink',
                  theme: CareThemeOption.purplePink,
                  selected: selectedTheme == CareThemeOption.purplePink,
                  onTap: () {
                    Navigator.pop(bottomSheetContext);
                    onThemeChanged(CareThemeOption.purplePink);
                  },
                ),

                _ThemeOptionTile(
                  label: 'Kids',
                  theme: CareThemeOption.kids,
                  selected: selectedTheme == CareThemeOption.kids,
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
  final String label;
  final CareThemeOption theme;
  final bool selected;
  final VoidCallback onTap;

  const _ThemeOptionTile({
    required this.label,
    required this.theme,
    required this.selected,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Semantics(
      button: true,
      selected: selected,
      label: '$label theme',
      child: ListTile(
        minVerticalPadding: AppSpacing.sm,
        contentPadding: const EdgeInsets.symmetric(vertical: AppSpacing.sm),
        onTap: onTap,

        leading: ClipRRect(
          borderRadius: BorderRadius.circular(8),
          child: SvgPicture.asset(
            ThemePreviewAsset.forTheme(theme),
            width: 82,
            height: 48,
            fit: BoxFit.cover,
          ),
        ),

        title: Text(label, style: Theme.of(context).textTheme.titleLarge),

        trailing: selected
            ? Icon(
                Icons.check_circle,
                color: Theme.of(context).colorScheme.primary,
                semanticLabel: 'Selected',
              )
            : const Icon(Icons.circle_outlined, semanticLabel: 'Not selected'),
      ),
    );
  }
}
