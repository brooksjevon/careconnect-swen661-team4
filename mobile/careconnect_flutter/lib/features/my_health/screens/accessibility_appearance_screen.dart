import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';

import '../../../app/accessibility/accessibility_preferences.dart';
import '../../../app/theme/app_spacing.dart';
import '../../../app/theme/care_theme_option.dart';
import '../../../app/theme/theme_preview_asset.dart';

class AccessibilityAppearanceScreen extends StatefulWidget {
  final CareThemeOption selectedTheme;
  final ValueChanged<CareThemeOption> onThemeChanged;
  final AccessibilityPreferences preferences;
  final ValueChanged<AccessibilityPreferences> onPreferencesChanged;

  const AccessibilityAppearanceScreen({
    super.key,
    required this.selectedTheme,
    required this.onThemeChanged,
    required this.preferences,
    required this.onPreferencesChanged,
  });

  @override
  State<AccessibilityAppearanceScreen> createState() =>
      _AccessibilityAppearanceScreenState();
}

class _AccessibilityAppearanceScreenState
    extends State<AccessibilityAppearanceScreen> {
  late CareThemeOption selectedTheme;
  late AccessibilityPreferences preferences;

  @override
  void initState() {
    super.initState();

    selectedTheme = widget.selectedTheme;
    preferences = widget.preferences;
  }

  void selectTheme(CareThemeOption theme) {
    setState(() {
      selectedTheme = theme;
    });

    widget.onThemeChanged(theme);
  }

  void updatePreferences(AccessibilityPreferences value) {
    setState(() {
      preferences = value;
    });

    widget.onPreferencesChanged(value);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Accessibility & Appearance')),
      body: SafeArea(
        child: ListView(
          padding: const EdgeInsets.all(AppSpacing.base),
          children: [
            Text(
              'Choose Your Theme',
              style: Theme.of(context).textTheme.headlineLarge,
            ),
            const SizedBox(height: AppSpacing.sm),
            Text(
              'Choose the appearance that feels most comfortable. Accessibility features remain available in every theme.',
              style: Theme.of(context).textTheme.bodyLarge,
            ),
            const SizedBox(height: AppSpacing.lg),

            _ThemeCard(
              title: 'Neutral',
              description: 'Calm, simple and professional.',
              theme: CareThemeOption.neutral,
              selected: selectedTheme == CareThemeOption.neutral,
              onSelected: selectTheme,
            ),

            const SizedBox(height: AppSpacing.md),

            _ThemeCard(
              title: 'Blue & Green',
              description:
                  'Cool healthcare colors with wellness-inspired imagery.',
              theme: CareThemeOption.blueGreen,
              selected: selectedTheme == CareThemeOption.blueGreen,
              onSelected: selectTheme,
            ),

            const SizedBox(height: AppSpacing.md),

            _ThemeCard(
              title: 'Purple & Pink',
              description: 'Warm purple and pink accents with gentle imagery.',
              theme: CareThemeOption.purplePink,
              selected: selectedTheme == CareThemeOption.purplePink,
              onSelected: selectTheme,
            ),

            const SizedBox(height: AppSpacing.md),

            _ThemeCard(
              title: 'Kids',
              description:
                  'Bright and playful with sun, clouds and friendly shapes.',
              theme: CareThemeOption.kids,
              selected: selectedTheme == CareThemeOption.kids,
              onSelected: selectTheme,
            ),

            const SizedBox(height: AppSpacing.xl),

            Text(
              'Reading Settings',
              style: Theme.of(context).textTheme.headlineMedium,
            ),

            const SizedBox(height: AppSpacing.md),

            Card(
              child: Padding(
                padding: const EdgeInsets.all(AppSpacing.base),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Text Size',
                      style: Theme.of(context).textTheme.titleLarge,
                    ),
                    const SizedBox(height: AppSpacing.sm),
                    Text(
                      'Choose the text size that is easiest for you to read.',
                      style: Theme.of(context).textTheme.bodyMedium,
                    ),
                    const SizedBox(height: AppSpacing.md),

                    SizedBox(
                      width: double.infinity,
                      child: SegmentedButton<TextSizeOption>(
                        segments: const [
                          ButtonSegment<TextSizeOption>(
                            value: TextSizeOption.standard,
                            label: Text('Standard'),
                          ),
                          ButtonSegment<TextSizeOption>(
                            value: TextSizeOption.large,
                            label: Text('Large'),
                          ),
                          ButtonSegment<TextSizeOption>(
                            value: TextSizeOption.extraLarge,
                            label: Text('Extra Large'),
                          ),
                        ],
                        selected: {preferences.textSize},
                        onSelectionChanged: (selection) {
                          if (selection.isEmpty) {
                            return;
                          }

                          updatePreferences(
                            preferences.copyWith(textSize: selection.first),
                          );
                        },
                      ),
                    ),
                  ],
                ),
              ),
            ),

            const SizedBox(height: AppSpacing.md),

            Card(
              child: SwitchListTile(
                value: preferences.wideSpacing,
                onChanged: (value) {
                  updatePreferences(preferences.copyWith(wideSpacing: value));
                },
                secondary: const Icon(Icons.format_line_spacing),
                title: const Text('Wide Line & Letter Spacing'),
                subtitle: const Text(
                  'Adds more space between lines and letters.',
                ),
              ),
            ),

            const SizedBox(height: AppSpacing.md),

            Card(
              child: SwitchListTile(
                value: preferences.readAloudEnabled,
                onChanged: (value) {
                  updatePreferences(
                    preferences.copyWith(readAloudEnabled: value),
                  );
                },
                secondary: const Icon(Icons.volume_up_outlined),
                title: const Text('Read Aloud'),
                subtitle: const Text(
                  'Keep reading assistance available for supported content.',
                ),
              ),
            ),

            const SizedBox(height: AppSpacing.xl),
          ],
        ),
      ),
    );
  }
}

class _ThemeCard extends StatelessWidget {
  final String title;
  final String description;
  final CareThemeOption theme;
  final bool selected;
  final ValueChanged<CareThemeOption> onSelected;

  const _ThemeCard({
    required this.title,
    required this.description,
    required this.theme,
    required this.selected,
    required this.onSelected,
  });

  @override
  Widget build(BuildContext context) {
    final primary = Theme.of(context).colorScheme.primary;

    return Semantics(
      button: true,
      selected: selected,
      label: '$title appearance theme',
      child: Card(
        clipBehavior: Clip.antiAlias,
        child: InkWell(
          onTap: () {
            onSelected(theme);
          },
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              AspectRatio(
                aspectRatio: 2,
                child: SvgPicture.asset(
                  ThemePreviewAsset.forTheme(theme),
                  fit: BoxFit.cover,
                ),
              ),

              Padding(
                padding: const EdgeInsets.all(AppSpacing.base),
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            title,
                            style: Theme.of(context).textTheme.titleLarge,
                          ),
                          const SizedBox(height: AppSpacing.xs),
                          Text(
                            description,
                            style: Theme.of(context).textTheme.bodyMedium,
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(width: AppSpacing.md),
                    Icon(
                      selected ? Icons.check_circle : Icons.circle_outlined,
                      color: selected ? primary : null,
                      semanticLabel: selected ? 'Selected' : 'Not selected',
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
