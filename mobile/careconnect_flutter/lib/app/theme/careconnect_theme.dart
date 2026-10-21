import 'package:flutter/material.dart';

import 'app_colors.dart';
import 'app_typography.dart';
import 'care_theme_option.dart';
import 'care_theme_tokens.dart';

class CareConnectTheme {
  static ThemeData getTheme(
    CareThemeOption option, {
    bool wideSpacing = false,
  }) {
    switch (option) {
      case CareThemeOption.neutral:
        return _buildTheme(
          primary: AppColors.neutralPrimary,
          secondary: AppColors.neutralSecondary,
          background: AppColors.neutralBackground,
          textColor: AppColors.neutralText,
          softSurface: AppColors.neutralSoftSurface,
          accent: AppColors.neutralSecondary,
          decorativeAccent: AppColors.neutralAccent,
          navigationSurface: const Color(0xFFEFF1F3),
          wideSpacing: wideSpacing,
        );

      case CareThemeOption.blueGreen:
        return _buildTheme(
          primary: AppColors.blueGreenPrimary,
          secondary: AppColors.blueGreenSecondary,
          background: AppColors.blueGreenBackground,
          textColor: AppColors.blueGreenText,
          softSurface: AppColors.blueGreenSoftSurface,
          accent: AppColors.blueGreenAccent,
          decorativeAccent: AppColors.blueGreenSecondary,
          navigationSurface: const Color(0xFFE5F4F0),
          wideSpacing: wideSpacing,
        );

      case CareThemeOption.purplePink:
        return _buildTheme(
          primary: AppColors.purplePinkPrimary,
          secondary: AppColors.purplePinkSecondary,
          background: AppColors.purplePinkBackground,
          textColor: AppColors.purplePinkText,
          softSurface: AppColors.purplePinkSoftSurface,
          accent: AppColors.purplePinkAccent,
          decorativeAccent: AppColors.purplePinkSecondary,
          navigationSurface: const Color(0xFFF8EAF3),
          wideSpacing: wideSpacing,
        );

      case CareThemeOption.kids:
        return _buildTheme(
          primary: AppColors.kidsPrimary,
          secondary: AppColors.kidsSecondary,
          background: AppColors.kidsBackground,
          textColor: AppColors.kidsText,
          softSurface: AppColors.kidsSoftSurface,
          accent: AppColors.kidsYellow,
          decorativeAccent: AppColors.kidsCoral,
          navigationSurface: const Color(0xFFE7F2FC),
          wideSpacing: wideSpacing,
        );
    }
  }

  static ThemeData _buildTheme({
    required Color primary,
    required Color secondary,
    required Color background,
    required Color textColor,
    required Color softSurface,
    required Color accent,
    required Color decorativeAccent,
    required Color navigationSurface,
    required bool wideSpacing,
  }) {
    final spacingMultiplier = wideSpacing ? 1.12 : 1.0;

    TextStyle adjust(TextStyle style) {
      return style.copyWith(
        height: (style.height ?? 1.0) * spacingMultiplier,
        letterSpacing: wideSpacing ? 0.4 : null,
      );
    }

    return ThemeData(
      useMaterial3: true,

      scaffoldBackgroundColor: background,

      colorScheme: ColorScheme.fromSeed(
        seedColor: primary,
        primary: primary,
        secondary: secondary,
        surface: background,
        error: AppColors.error,
      ),

      extensions: [
        CareThemeTokens(
          softSurface: softSurface,
          accent: accent,
          decorativeAccent: decorativeAccent,
          navigationSurface: navigationSurface,
          border: secondary.withValues(alpha: 0.30),
        ),
      ],

      appBarTheme: AppBarTheme(
        backgroundColor: primary,
        foregroundColor: AppColors.white,
        elevation: 0,
        surfaceTintColor: Colors.transparent,
        titleTextStyle: const TextStyle(
          color: AppColors.white,
          fontSize: 20,
          fontWeight: FontWeight.w700,
        ),
      ),

      textTheme: TextTheme(
        headlineLarge: adjust(AppTypography.screenTitle(primary)),
        headlineMedium: adjust(AppTypography.sectionTitle(primary)),
        titleLarge: adjust(AppTypography.cardTitle(textColor)),
        bodyLarge: adjust(AppTypography.bodyPrimary(textColor)),
        bodyMedium: adjust(AppTypography.bodySecondary(textColor)),
        labelLarge: AppTypography.buttonLabel,
      ),

      iconTheme: IconThemeData(color: primary),

      cardTheme: CardThemeData(
        color: softSurface,
        elevation: 0,
        margin: EdgeInsets.zero,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(18),
          side: BorderSide(color: secondary.withValues(alpha: 0.22)),
        ),
      ),

      navigationBarTheme: NavigationBarThemeData(
        backgroundColor: navigationSurface,
        indicatorColor: accent.withValues(alpha: 0.35),
        elevation: 0,
        height: 72,
      ),

      navigationRailTheme: NavigationRailThemeData(
        backgroundColor: navigationSurface,
        indicatorColor: accent.withValues(alpha: 0.35),
        selectedIconTheme: IconThemeData(color: primary),
      ),

      filledButtonTheme: FilledButtonThemeData(
        style: FilledButton.styleFrom(
          minimumSize: const Size(48, 48),
          backgroundColor: primary,
          foregroundColor: AppColors.white,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(14),
          ),
        ),
      ),

      outlinedButtonTheme: OutlinedButtonThemeData(
        style: OutlinedButton.styleFrom(
          minimumSize: const Size(48, 48),
          foregroundColor: primary,
          side: BorderSide(color: secondary, width: 1.5),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(14),
          ),
        ),
      ),

      dividerTheme: DividerThemeData(color: secondary.withValues(alpha: 0.25)),

      listTileTheme: ListTileThemeData(iconColor: primary),

      snackBarTheme: SnackBarThemeData(
        backgroundColor: primary,
        contentTextStyle: const TextStyle(color: AppColors.white),
      ),
    );
  }
}
