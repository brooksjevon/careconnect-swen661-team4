import 'care_theme_option.dart';

class ThemePreviewAsset {
  static String forTheme(CareThemeOption theme) {
    switch (theme) {
      case CareThemeOption.neutral:
        return 'assets/theme_previews/neutral.svg';

      case CareThemeOption.blueGreen:
        return 'assets/theme_previews/blue_green.svg';

      case CareThemeOption.purplePink:
        return 'assets/theme_previews/purple_pink.svg';

      case CareThemeOption.kids:
        return 'assets/theme_previews/kids.svg';
    }
  }
}
