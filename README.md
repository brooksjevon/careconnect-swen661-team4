# SWEN 661 — Team 4 — Week 4 UI Development

## Project Description

CareConnect is a daily companion app designed for care recipients, including individuals with dyslexia, and their caregivers, helping them stay organized and connected throughout the day.

This repository contains the **Flutter mobile implementation** for CareConnect, a cross-platform application developed alongside a separate React/Vite web version of the product.

The Flutter application currently provides the following feature areas:

- **Auth** — sign-in and sign-up screens
- **Home** — landing dashboard
- **Reminders / Schedule** — daily schedule and reminder screens
- **Medications** — medication tracking screens and models
- **Appointments** — appointment management screens
- **Care Plan** — care plan screens
- **My Health** — personal health screens

The application also includes a custom theming system using `careconnect_theme.dart`, color, typography, and spacing tokens, as well as role-based navigation scaffolding through `role_scope.dart` and `careconnect_shell.dart`.

The current implementation focuses primarily on the Flutter user interface and application workflows. The application is not yet connected to a live backend or shared production data store.

**Tech Stack:** Flutter / Dart, with platform runners included for Android, iOS, macOS, Windows, Linux, and web.

---

## How to Run the App

From the repository root:

```bash
cd mobile/careconnect_flutter
flutter pub get
flutter devices
flutter run -d <device-id>
```

### Requirements

- Flutter SDK
- Dart SDK
- Android Studio and Android SDK for Android development
- Xcode for iOS development on macOS
- A physical device or emulator/simulator for mobile testing

The application can run standalone without backend or server configuration for the currently implemented UI workflows.

---

## How to Run Tests

From `mobile/careconnect_flutter`:

```bash
flutter test
```

To run an individual test file:

```bash
flutter test test/<file>.dart
```

To run the complete test suite and generate coverage:

```bash
flutter test --coverage
```

The current test suite contains **22 passing tests**, consisting of:

- **17 widget tests** covering UI behavior and application workflows
- **26 unit tests** covering data models, business logic, accessibility preferences, calculations, role state-change logic, and theme state logic

Test files include:

- `widget_test.dart`
- `sign_in_screen_test.dart`
- `appointment_workflow_test.dart`
- `care_instructions_test.dart`
- `medication_workflow_test.dart`
- `unit/medication_model_test.dart`
- `unit/business_logic_test.dart`

---

## Test Coverage Report

Generate the LCOV HTML coverage report with:

```bash
flutter test --coverage
genhtml coverage/lcov.info -o coverage/html
```

Open the generated report on macOS:

```bash
open coverage/html/index.html
```

The Week 4 test suite achieved **81.5% line coverage (856 of 1,050 lines)**, exceeding the required minimum of 60%.

The generated coverage report is included under:

```text
mobile/careconnect_flutter/coverage/
```

The HTML coverage report entry point is:

```text
mobile/careconnect_flutter/coverage/html/index.html
```

A screenshot of the overall coverage report is also included with the Week 4 submission.

---

## Code Quality and Security Analysis

Flutter static analysis was performed with:

```bash
flutter analyze
```

Result:

```text
No issues found!
```

A source-code security scan was performed using Semgrep:

```bash
semgrep --config=auto lib/
```

The Semgrep scan evaluated 27 Git-tracked application source files using 47 security rules.

**Security scan result: 0 findings and 0 blocking findings.**

---

## Build Instructions

### Android

Generate the Android release APK with:

```bash
flutter build apk
```

The Week 4 Android release build completed successfully.

Generated artifact:

```text
build/app/outputs/flutter-apk/app-release.apk
```

### iOS

An iOS build was evaluated on macOS. Device deployment requires Apple development signing configuration.

The Android APK is provided as the distributable mobile artifact for the Week 4 submission.

---

## Known Issues or Limitations

- The Flutter application is not yet connected to a production backend or API.
- Application data is not currently synchronized with the companion web application.
- Persistent/shared production data storage has not yet been integrated.
- iOS device deployment requires Apple development signing configuration.
- Some feature areas currently have lower automated test coverage than the primary medication, appointment, authentication, and care-plan workflows.

---

## Team Member Contributions This Week

| Team Member | Contribution |
|---|---|
| [Jonay Simmons] | [Part 1] |
| [Stephane Aloys Tekam Nwafor] | [Part 2] |
| [Jevon Brooks] | [Part 2 & 3] |

---

## AI Usage Summary

AI assistance was used during Week 4 to support development, testing, troubleshooting, and documentation activities.

AI-assisted activities included:

- Reviewing the Flutter project structure and development environment.
- Providing guidance for running the Flutter application and automated tests.
- Assisting with the development and review of Medication model unit tests.
- Troubleshooting Flutter test paths and coverage-report generation.
- Providing guidance for LCOV/`genhtml` coverage generation.
- Providing guidance for Flutter static analysis and Semgrep security scanning.

AI-generated or AI-assisted suggestions were reviewed and executed by team members within the project environment before inclusion in the Week 4 submission.
