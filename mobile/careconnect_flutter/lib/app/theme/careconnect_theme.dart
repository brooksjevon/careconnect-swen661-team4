import 'package:flutter/material.dart';

import 'app_colors.dart';
import 'app_typography.dart';
import 'care_theme_option.dart';

class CareConnectTheme {
  static ThemeData getTheme(CareThemeOption option) {
    switch (option) {
      case CareThemeOption.neutral:
        return _buildTheme(
          primary: AppColors.neutralPrimary,
          secondary: AppColors.neutralSecondary,
          background: AppColors.neutralBackground,
          textColor: AppColors.neutralText,
        );

      case CareThemeOption.blueGreen:
        return _buildTheme(
          primary: AppColors.blueGreenPrimary,
          secondary: AppColors.blueGreenSecondary,
          background: AppColors.blueGreenBackground,
          textColor: AppColors.blueGreenText,
        );

      case CareThemeOption.purplePink:
        return _buildTheme(
          primary: AppColors.purplePinkPrimary,
          secondary: AppColors.purplePinkSecondary,
          background: AppColors.purplePinkBackground,
          textColor: AppColors.purplePinkText,
        );

      case CareThemeOption.kids:
        return _buildTheme(
          primary: AppColors.kidsPrimary,
          secondary: AppColors.kidsSecondary,
          background: AppColors.kidsBackground,
          textColor: AppColors.kidsText,
        );
    }
  }

  static ThemeData _buildTheme({
    required Color primary,
    required Color secondary,
    required Color background,
    required Color textColor,
  }) {
    return ThemeData(
      useMaterial3: true,

      scaffoldBackgroundColor: background,

      colorScheme: ColorScheme.fromSeed(
        seedColor: primary,
        primary: primary,
        secondary: secondary,
        surface: AppColors.white,
        error: AppColors.error,
      ),

      textTheme: TextTheme(
        headlineLarge: AppTypography.screenTitle(primary),
        headlineMedium: AppTypography.sectionTitle(primary),
        titleLarge: AppTypography.cardTitle(textColor),
        bodyLarge: AppTypography.bodyPrimary(textColor),
        bodyMedium: AppTypography.bodySecondary(textColor),
        labelLarge: AppTypography.buttonLabel,
      ),

      filledButtonTheme: FilledButtonThemeData(
        style: FilledButton.styleFrom(
          minimumSize: const Size(48, 48),
        ),
      ),

      outlinedButtonTheme: OutlinedButtonThemeData(
        style: OutlinedButton.styleFrom(
          minimumSize: const Size(48, 48),
        ),
      ),

      cardTheme: const CardThemeData(
        color: AppColors.white,
        elevation: 0,
        margin: EdgeInsets.zero,
      ),
    );
  }
}
