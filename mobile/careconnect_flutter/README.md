# CareConnect — Flutter Accessibility Implementation

## SWEN 661 — Team 4 — Week 6

## Project Description

CareConnect is a daily companion application designed to help care recipients and caregivers manage healthcare activities, appointments, medications, schedules, care plans, and personal health information.

For Week 6, the Flutter implementation was updated with accessibility support and accessibility-focused testing. The implementation focuses on WCAG 2.1 Level AA accessibility requirements while preserving the existing CareConnect workflows.

The Flutter application includes the following feature areas:

- Authentication
- Home
- Medications
- Appointments
- Appointment Preparation
- Care Plan
- Schedule and Reminders
- My Health
- Accessibility-focused navigation and controls

---

## Project Location

The Flutter application is located at:

    mobile/careconnect_flutter/

From the repository root:

    cd mobile/careconnect_flutter

---

## Requirements

The Flutter application requires:

- Flutter SDK
- Dart SDK
- Android Studio / Android SDK for Android testing
- Xcode for iOS and macOS testing on macOS
- Chrome for Flutter web testing

Install project dependencies with:

    flutter pub get

Check the development environment with:

    flutter doctor

---

## Running the Application

View available devices with:

    flutter devices

Run the application on a selected device with:

    flutter run -d <device-id>

For example, to run the application in Chrome:

    flutter run -d chrome

The application can also be run on supported Android emulators, iOS simulators, macOS, or physical devices.

---

# Week 6 Accessibility Implementation

## Accessibility Overview

The Week 6 Flutter implementation includes accessibility improvements intended to support WCAG 2.1 Level AA requirements and improve compatibility with assistive technologies.

Accessibility work includes the use of Flutter semantics, meaningful accessible labels, accessible interactive controls, appropriate touch-target sizing, readable visual presentation, and support for assistive navigation.

The implementation was also evaluated using Flutter's automated accessibility guideline testing APIs.

---

## Semantic Accessibility

Flutter Semantics support is used throughout the application to provide additional information to assistive technologies.

Interactive elements are designed to expose meaningful information such as:

- Control labels
- Button purposes
- Interactive states
- Navigation actions
- Content descriptions

Meaningful accessibility labels help screen-reader users understand the purpose of controls without relying exclusively on visual context.

---

## Touch Targets

Interactive controls are designed with mobile accessibility in mind.

The Week 6 accessibility requirements specify:

- Android touch targets of at least 48 x 48 logical pixels
- iOS touch targets of at least 44 x 44 points

Flutter automated accessibility guideline tests are used to identify controls that do not satisfy the applicable target-size guidelines.

---

## Color Contrast

The application is designed to provide readable foreground and background combinations.

The Week 6 WCAG 2.1 Level AA targets are:

- 4.5:1 contrast for normal text
- 3:1 contrast for large text

Flutter's textContrastGuideline is included in the automated accessibility test suite.

---

## Text Scaling

The CareConnect interface is designed to accommodate system text scaling and accessible text presentation.

Week 6 accessibility requirements include support for text scaling up to 200%.

Users should verify critical workflows at increased system text sizes during manual accessibility testing to confirm that important content and controls remain usable and understandable.

---

## Focus and Navigation

CareConnect uses Flutter navigation and accessible controls to provide a logical navigation experience.

Accessibility testing should verify:

- Logical navigation order
- Reachability of interactive controls
- Visible and understandable focus behavior
- Keyboard accessibility where supported
- Screen-reader navigation through interactive elements

---

# Flutter Accessibility Guideline Tests

A dedicated automated accessibility test suite is located at:

    test/accessibility_guidelines_test.dart

The suite evaluates the application against Flutter accessibility guidelines for:

1. Labeled tap targets
2. Android tap-target sizing
3. iOS tap-target sizing
4. Text contrast

The tests use Flutter's meetsGuideline matcher with:

    labeledTapTargetGuideline
    androidTapTargetGuideline
    iOSTapTargetGuideline
    textContrastGuideline

Run only the accessibility guideline tests with:

    flutter test test/accessibility_guidelines_test.dart

Verified Week 6 result:

    4 accessibility guideline tests passed

---

# Automated Testing

Run the complete Flutter test suite with:

    flutter test

Verified Week 6 result:

    26 tests passed
    0 tests failed

The complete suite includes unit, widget, workflow, and accessibility-focused tests.

---

## Integration Testing

The Flutter integration test is located at:

    integration_test/appointment_flow_test.dart

The integration test validates a critical appointment workflow.

The test verifies that a user can:

1. Navigate to Appointments
2. Open appointment preparation
3. Review the appointment preparation workflow
4. Mark appointment preparation complete
5. Verify the completed preparation state

Run the integration test on macOS with:

    flutter test integration_test/appointment_flow_test.dart -d macos

Verified Week 6 result:

    1 integration test passed

---

# Code Coverage

Generate Flutter test coverage with:

    flutter test --coverage

The LCOV coverage file is generated at:

    coverage/lcov.info

View the coverage summary with:

    lcov --summary coverage/lcov.info

Verified Week 6 coverage:

    Source files: 22
    Lines: 80.7%
    Covered lines: 933 of 1156

The Week 6 requirement is at least 60% test coverage.

The Flutter implementation exceeds this requirement with 80.7% line coverage.

---

## HTML Coverage Report

Generate an HTML version of the coverage report with:

    genhtml coverage/lcov.info -o coverage/html

On macOS, open the generated report with:

    open coverage/html/index.html

The HTML report can be used as visual evidence of the Week 6 test coverage results.

---

# Screen Reader Testing

Week 6 requires manual testing with platform screen readers.

The required screen-reader environments are:

### Android

- TalkBack

### iOS

- VoiceOver

Manual screen-reader testing should verify that:

- Interactive controls are announced
- Controls have meaningful labels
- Navigation order is understandable
- Buttons communicate their purpose
- Important application information can be discovered without relying only on visual presentation
- Critical CareConnect workflows remain usable with the screen reader enabled

A 2–3 minute screen-reader demonstration should be recorded as part of the Week 6 submission evidence.

Note: Manual TalkBack and VoiceOver verification and recording should be documented after the corresponding platform tests have been completed.

---

# Accessibility Testing Summary

The following accessibility-related automated testing has been completed:

| Test Area | Result |
| --- | --- |
| Labeled tap-target guideline | Passed |
| Android tap-target guideline | Passed |
| iOS tap-target guideline | Passed |
| Text contrast guideline | Passed |
| Flutter accessibility guideline tests | 4/4 Passed |
| Complete Flutter automated test suite | 26/26 Passed |
| Flutter integration test | Passed |
| Flutter line coverage | 80.7% |

Automated accessibility testing supplements, but does not replace, manual testing with TalkBack and VoiceOver.

---

# Static Analysis

Run Flutter static analysis with:

    flutter analyze

Static analysis should be completed before final submission to identify potential Dart or Flutter implementation issues.

---

# Building the Application

To create an Android release APK:

    flutter build apk --release

The generated APK is normally located at:

    build/app/outputs/flutter-apk/app-release.apk

The release APK can be included with the Week 6 submission when required.

---

# Known Limitations

- CareConnect currently focuses on the mobile user interface and application workflows rather than production backend integration.
- Application data is not currently synchronized with a production CareConnect service.
- Authentication demonstrates the application workflow rather than a production authentication system.
- Automated accessibility guideline tests do not by themselves establish complete WCAG 2.1 Level AA conformance across every application state.
- Manual TalkBack and VoiceOver testing is required in addition to automated accessibility tests.
- Platform-specific behavior may vary between emulators, simulators, and physical devices.
- Increased text sizes and assistive navigation should be manually verified across critical workflows as part of final accessibility validation.

---

# Week 6 Verification Summary

The Flutter implementation has currently achieved the following verified results:

- Flutter dependencies successfully installed
- Flutter application successfully launched
- 26 automated tests passed
- 4 Flutter accessibility guideline tests passed
- Appointment workflow integration test passed
- 80.7% Flutter line coverage
- HTML coverage report generated

Remaining manual submission evidence includes completion and documentation of the required TalkBack and VoiceOver testing and associated screen-reader recording.
