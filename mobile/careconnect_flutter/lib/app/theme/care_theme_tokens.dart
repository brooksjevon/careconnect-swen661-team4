import 'package:flutter/material.dart';

@immutable
class CareThemeTokens extends ThemeExtension<CareThemeTokens> {
  final Color softSurface;
  final Color accent;
  final Color decorativeAccent;
  final Color navigationSurface;
  final Color border;

  const CareThemeTokens({
    required this.softSurface,
    required this.accent,
    required this.decorativeAccent,
    required this.navigationSurface,
    required this.border,
  });

  @override
  CareThemeTokens copyWith({
    Color? softSurface,
    Color? accent,
    Color? decorativeAccent,
    Color? navigationSurface,
    Color? border,
  }) {
    return CareThemeTokens(
      softSurface: softSurface ?? this.softSurface,
      accent: accent ?? this.accent,
      decorativeAccent: decorativeAccent ?? this.decorativeAccent,
      navigationSurface: navigationSurface ?? this.navigationSurface,
      border: border ?? this.border,
    );
  }

  @override
  CareThemeTokens lerp(CareThemeTokens? other, double t) {
    if (other == null) {
      return this;
    }

    return CareThemeTokens(
      softSurface: Color.lerp(softSurface, other.softSurface, t)!,
      accent: Color.lerp(accent, other.accent, t)!,
      decorativeAccent: Color.lerp(
        decorativeAccent,
        other.decorativeAccent,
        t,
      )!,
      navigationSurface: Color.lerp(
        navigationSurface,
        other.navigationSurface,
        t,
      )!,
      border: Color.lerp(border, other.border, t)!,
    );
  }
}
