enum TextSizeOption { standard, large, extraLarge }

extension TextSizeOptionValues on TextSizeOption {
  double get scale {
    switch (this) {
      case TextSizeOption.standard:
        return 1.0;

      case TextSizeOption.large:
        return 1.15;

      case TextSizeOption.extraLarge:
        return 1.3;
    }
  }

  String get label {
    switch (this) {
      case TextSizeOption.standard:
        return 'Standard';

      case TextSizeOption.large:
        return 'Large';

      case TextSizeOption.extraLarge:
        return 'Extra Large';
    }
  }
}

class AccessibilityPreferences {
  final TextSizeOption textSize;
  final bool wideSpacing;
  final bool readAloudEnabled;

  const AccessibilityPreferences({
    this.textSize = TextSizeOption.standard,
    this.wideSpacing = false,
    this.readAloudEnabled = false,
  });

  AccessibilityPreferences copyWith({
    TextSizeOption? textSize,
    bool? wideSpacing,
    bool? readAloudEnabled,
  }) {
    return AccessibilityPreferences(
      textSize: textSize ?? this.textSize,
      wideSpacing: wideSpacing ?? this.wideSpacing,
      readAloudEnabled: readAloudEnabled ?? this.readAloudEnabled,
    );
  }
}
