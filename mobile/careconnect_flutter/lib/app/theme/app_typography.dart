import 'package:flutter/material.dart';

class AppTypography {
  static TextStyle screenTitle(Color color) {
    return TextStyle(
      fontSize: 30,
      fontWeight: FontWeight.w700,
      height: 1.25,
      color: color,
    );
  }

  static TextStyle sectionTitle(Color color) {
    return TextStyle(
      fontSize: 24,
      fontWeight: FontWeight.w700,
      height: 1.3,
      color: color,
    );
  }

  static TextStyle cardTitle(Color color) {
    return TextStyle(
      fontSize: 20,
      fontWeight: FontWeight.w700,
      height: 1.4,
      color: color,
    );
  }

  static TextStyle bodyPrimary(Color color) {
    return TextStyle(
      fontSize: 18,
      fontWeight: FontWeight.w400,
      height: 1.5,
      color: color,
    );
  }

  static TextStyle bodySecondary(Color color) {
    return TextStyle(
      fontSize: 16,
      fontWeight: FontWeight.w400,
      height: 1.5,
      color: color,
    );
  }

  static const TextStyle buttonLabel = TextStyle(
    fontSize: 16,
    fontWeight: FontWeight.w600,
  );
}
