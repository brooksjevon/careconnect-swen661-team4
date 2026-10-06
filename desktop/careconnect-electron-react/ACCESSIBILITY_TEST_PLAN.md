# CareConnect Windows Accessibility Test Plan

Target platform: Windows 11.

## Already implemented — regression check
### Keyboard-only navigation
Use no mouse. Test Landing, Sign in, Sign up, Role chooser, every Patient page,
every Caregiver page, and Settings.
- Tab and Shift+Tab reach all interactive controls.
- Arrow keys move spatially across the full application.
- Enter/Space activate controls.
- Alt+Left/Alt+Right navigate history.
- Forms preserve normal keyboard editing.
- Escape closes dialogs.
- No keyboard trap occurs.

### Focus indicators
- Every link, button, field, select, sidebar item, card action, and Settings control
  has a clearly visible focus indicator.
- Focus remains visible in Light, Dark, and every CareConnect theme.

## Newly implemented — NVDA screen reader
Test with NVDA on Windows.
1. Start NVDA, then launch CareConnect.
2. Navigate using Tab, Shift+Tab, arrow keys, headings and landmarks.
3. Confirm controls have understandable accessible names.
4. Confirm buttons/links announce their role.
5. Confirm form fields announce labels and state.
6. Change pages and confirm the new page heading is announced.
7. Open the keyboard-help dialog and confirm it is announced as a dialog.
8. Verify Settings choices can be understood without relying on color alone.
9. Verify no important content is silent or read twice.

Expected: the application is understandable and operable without looking at the screen.

## Newly implemented — Windows Contrast Themes
Windows 11: Settings > Accessibility > Contrast themes.
1. Enable each available Contrast Theme.
2. Launch/reload CareConnect.
3. Test all major screens.
4. Confirm text remains readable.
5. Confirm focused control is obvious.
6. Confirm selected/current navigation is distinguishable.
7. Confirm buttons, fields, cards and boundaries remain visible.
8. Confirm information is not communicated by color alone.

Implementation uses CSS `@media (forced-colors: active)` and Windows system colors
such as Canvas, CanvasText, Highlight and HighlightText.

## Important
Automated code changes cannot truthfully certify NVDA or Windows Contrast Theme behavior.
The final acceptance pass must be performed on Windows with NVDA and Windows Contrast
Themes enabled. Record defects and retest after fixes.
