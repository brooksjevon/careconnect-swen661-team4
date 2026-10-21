import 'care_theme_option.dart';

class ThemePhotoAsset {
  static String forTheme(CareThemeOption theme) {
    switch (theme) {
      case CareThemeOption.neutral:
        return 'assets/theme_previews/neutral_photo.jpg';
      case CareThemeOption.blueGreen:
        return 'assets/theme_previews/blue_green_photo.jpg';
      case CareThemeOption.purplePink:
        return 'assets/theme_previews/purple_pink_photo.jpg';
      case CareThemeOption.kids:
        return 'assets/theme_previews/kids_photo.jpg';
    }
  }
}
