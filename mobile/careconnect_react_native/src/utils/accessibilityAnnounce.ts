import { AccessibilityInfo, Platform } from 'react-native';

/**
 * Announces a message directly to the active screen reader: VoiceOver on
 * iOS, TalkBack on Android. Use this for state changes that aren't tied to
 * an element the user is currently focused on (a validation error
 * appearing, a checklist becoming complete, a confirmation after an
 * action) so screen reader users get the same feedback sighted users get
 * from a visual change alone.
 *
 * Android supports queuing an announcement behind whatever TalkBack is
 * already reading via `announceForAccessibilityWithOptions`; iOS has no
 * equivalent option, so it falls back to the plain announcement API.
 */
export function announceForAccessibility(message: string) {
  if (Platform.OS === 'android') {
    AccessibilityInfo.announceForAccessibilityWithOptions(message, {
      queue: true,
    });
  } else {
    AccessibilityInfo.announceForAccessibility(message);
  }
}
