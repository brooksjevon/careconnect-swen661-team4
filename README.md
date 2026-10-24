# SWEN 661 — Team 4 — Week 6 Accessibility and Testing

## Project Description

CareConnect is a daily companion application designed to help care recipients and caregivers stay organized, manage healthcare activities, and remain connected throughout the day.

For Week 6, the CareConnect project combines the existing Flutter and React Native mobile implementations with accessibility improvements, automated accessibility testing, integration testing, end-to-end testing, and updated code coverage.

The repository contains two mobile implementations:

    mobile/careconnect_flutter/
    mobile/careconnect_react_native/

The Week 6 work focuses on WCAG 2.1 Level AA accessibility requirements and validation of critical CareConnect workflows.

Major feature areas include:

- Authentication and role selection
- Home dashboard
- Medications
- Appointments
- Appointment preparation
- Care Plan
- Schedule and reminders
- My Health
- Accessibility settings
- Accessible navigation and controls

---

# Project Structure

The primary Week 6 mobile project structure is:

    mobile/
    ├── careconnect_flutter/
    │   ├── integration_test/
    │   ├── lib/
    │   ├── test/
    │   ├── README.md
    │   └── pubspec.yaml
    │
    └── careconnect_react_native/
        ├── .maestro/
        ├── __tests__/
        ├── src/
        ├── App.tsx
        ├── app.json
        ├── jest.setup.js
        ├── package.json
        └── tsconfig.json

The Flutter-specific accessibility and testing documentation is available at:

    mobile/careconnect_flutter/README.md

---

# Part 1 — Flutter Accessibility Implementation

The Flutter implementation includes accessibility improvements intended to support WCAG 2.1 Level AA requirements.

Accessibility work includes:

- Flutter Semantics support
- Meaningful labels for interactive controls
- Accessible buttons and navigation elements
- Mobile touch-target considerations
- Text contrast testing
- Text-scaling considerations
- Logical navigation and focus considerations
- Screen-reader compatibility considerations

Flutter accessibility testing uses the framework's built-in accessibility guideline matchers.

The dedicated test file is:

    mobile/careconnect_flutter/test/accessibility_guidelines_test.dart

The automated accessibility tests evaluate:

- Labeled tap targets
- Android tap-target sizing
- iOS tap-target sizing
- Text contrast

The Flutter guideline APIs used include:

    labeledTapTargetGuideline
    androidTapTargetGuideline
    iOSTapTargetGuideline
    textContrastGuideline

Verified result:

    4/4 Flutter accessibility guideline tests passed

---

# Part 2 — React Native Accessibility Implementation

The React Native implementation uses Expo, TypeScript, React Navigation, and React Native accessibility APIs.

Accessibility features include:

- Accessible labels
- Accessibility roles
- Accessibility states
- Accessibility hints where applicable
- Adjustable text size
- Wider text spacing
- Multiple visual themes
- Read-aloud assistance
- Accessible reusable cards and controls
- Accessibility-focused navigation

The React Native application contains a dedicated Accessibility screen where users can configure reading and visual preferences.

Reusable accessibility-related components include:

    AccessibleCard
    ReadAloudButton
    ThemedScreen
    ThemeBackground

Read-aloud functionality is implemented using:

    expo-speech

Global accessibility preferences are maintained through:

    src/context/AppContext.tsx

These settings include application theme, text scale, wider text spacing, and read-aloud preferences.

---

# React Native Project Location

From the repository root:

    cd mobile/careconnect_react_native

Install dependencies:

    npm install

Start Expo:

    npm start

The application can also be started directly for a supported platform.

Android:

    npm run android

iOS:

    npm run ios

Web:

    npm run web

---

# Flutter Project Location

From the repository root:

    cd mobile/careconnect_flutter

Install Flutter dependencies:

    flutter pub get

View available devices:

    flutter devices

Run the application:

    flutter run -d <device-id>

For example:

    flutter run -d chrome

---

# Automated Testing

## Flutter Tests

From:

    mobile/careconnect_flutter/

run:

    flutter test

Verified Week 6 result:

    26 tests passed
    0 tests failed

The complete suite includes unit, widget, workflow, and accessibility-focused testing.

To run only the Flutter accessibility guideline tests:

    flutter test test/accessibility_guidelines_test.dart

Verified result:

    4 accessibility guideline tests passed

---

## React Native Tests

From:

    mobile/careconnect_react_native/

run:

    npm test

The React Native test suite uses:

- Jest
- React Native Testing Library
- jest-expo

Verified Week 6 result:

    4 test suites passed
    30 tests passed
    0 tests failed

The React Native tests cover application behavior and accessibility-related functionality including:

- Sign-in behavior
- Role selection
- Home dashboard content
- Medication workflows
- Appointment workflows
- Care Plan behavior
- Schedule behavior
- Health information
- Accessibility settings
- Accessible components
- Read-aloud functionality
- Integration behavior

---

# TypeScript Validation

The React Native implementation uses TypeScript.

Run TypeScript validation with:

    npx tsc --noEmit

Verified Week 6 result:

    TypeScript validation passed

---

# Integration Testing

## Flutter Integration Test

The Flutter integration test is located at:

    mobile/careconnect_flutter/integration_test/appointment_flow_test.dart

The test validates the appointment preparation workflow.

It verifies that a user can:

1. Navigate to Appointments
2. Open appointment preparation
3. Review the preparation workflow
4. Mark preparation complete
5. Verify the completed state

Run the test with:

    flutter test integration_test/appointment_flow_test.dart -d macos

Verified Week 6 result:

    1 integration test passed

---

## React Native Integration Test

The React Native integration test is located at:

    mobile/careconnect_react_native/__tests__/integration.test.tsx

The integration test validates shared application behavior across the sign-in and medication workflow.

The test verifies that a patient can sign in, access medication information, mark Lisinopril as taken, and observe the updated medication state.

The integration test is included when running:

    npm test

Verified Week 6 result:

    React Native integration test passed

---

# End-to-End Testing with Maestro

Maestro is used for React Native end-to-end testing.

The Maestro flows are located at:

    mobile/careconnect_react_native/.maestro/

The Week 6 E2E flows are:

    patient-sign-in.yaml
    medication-workflow.yaml
    accessibility-settings.yaml

These provide three critical workflow tests.

---

## Patient Sign-In Flow

File:

    .maestro/patient-sign-in.yaml

This flow exercises the patient authentication interface and verifies that the user can progress beyond the sign-in screen.

The test uses accessible control information when interacting with the authentication interface.

---

## Medication Workflow

File:

    .maestro/medication-workflow.yaml

This flow verifies the medication completion workflow.

It checks for the Lisinopril medication, activates the accessible medication completion control, and verifies the Taken Today state.

---

## Accessibility Settings Flow

File:

    .maestro/accessibility-settings.yaml

This accessibility-focused E2E flow verifies the dedicated Accessibility interface.

The test checks accessibility-related content and uses accessibility labels to interact with theme controls.

The flow verifies elements including:

- Accessibility
- Appearance Theme
- Read Accessibility Page Aloud
- Neutral theme
- Blue & Green theme
- Text Size

Verified Week 6 result:

    Accessibility-focused Maestro flow passed

---

## Running Maestro Tests

From the React Native application directory:

    cd mobile/careconnect_react_native

With the appropriate Android emulator and Expo application running, an individual flow can be executed with:

    maestro test .maestro/patient-sign-in.yaml

    maestro test .maestro/medication-workflow.yaml

    maestro test .maestro/accessibility-settings.yaml

The flows may require the application to be placed in the appropriate starting state before execution.

For example:

- The patient sign-in flow begins from the sign-in interface.
- The medication workflow begins from the authenticated medication interface with the medication available to be marked as taken.
- The accessibility settings flow begins from the authenticated Accessibility interface.

These preconditions should be established before executing the corresponding flow.

---

# Code Coverage

## Flutter Coverage

Generate Flutter coverage with:

    flutter test --coverage

View the LCOV summary with:

    lcov --summary coverage/lcov.info

Verified Week 6 Flutter coverage:

    Source files: 22
    Covered lines: 933 of 1156
    Line coverage: 80.7%

The required coverage threshold is at least 60%.

Flutter exceeds the required threshold.

To generate the HTML report:

    genhtml coverage/lcov.info -o coverage/html

Open it on macOS with:

    open coverage/html/index.html

---

## React Native Coverage

Run the React Native tests and coverage workflow with:

    npm test

Verified Week 6 React Native coverage:

    Statements: 92.74%
    Branches:   80.46%
    Functions:  93.54%
    Lines:      92.74%

The required coverage threshold is at least 60%.

React Native exceeds the required threshold.

The generated HTML coverage report is located at:

    mobile/careconnect_react_native/coverage/lcov-report/index.html

From the React Native project directory, open it on macOS with:

    open coverage/lcov-report/index.html

---

# Week 6 Coverage Summary

| Platform | Line Coverage | Requirement | Status |
| --- | ---: | ---: | --- |
| Flutter | 80.7% | 60% | Meets requirement |
| React Native | 92.74% | 60% | Meets requirement |

Both implementations currently exceed the Week 6 automated test coverage requirement.

---

# Screen Reader Testing

Week 6 requires manual testing with platform screen readers.

Required environments include:

### Android

- TalkBack

### iOS

- VoiceOver

Screen-reader testing should verify:

- Interactive controls are announced
- Controls have meaningful labels
- Navigation order is understandable
- Buttons communicate their purpose
- Application content can be discovered without relying exclusively on visual presentation
- Critical workflows remain usable with the screen reader enabled

A 2–3 minute screen-reader demonstration should be recorded for the required platform testing.

Manual TalkBack and VoiceOver testing and the associated recordings should be documented after the tests are completed.

Automated accessibility testing supplements but does not replace manual screen-reader testing.

---

# WCAG 2.1 Level AA Accessibility Targets

The Week 6 implementation and testing address accessibility areas including:

- Meaningful accessible labels
- Semantic identification of controls
- Logical navigation
- Color contrast
- Touch-target sizing
- Text scaling
- Keyboard and assistive navigation considerations
- Screen-reader compatibility

Target contrast requirements include:

- 4.5:1 for normal text
- 3:1 for large text

Target touch sizes include:

- Flutter / Android: 48 x 48 logical pixels
- iOS: 44 x 44 points

The assignment also requires support for text scaling up to 200%.

Automated testing results should not be interpreted by themselves as proof of complete WCAG 2.1 Level AA conformance across every application screen and state. Manual accessibility verification remains part of the final validation process.

---

# Building the Flutter APK

From:

    mobile/careconnect_flutter/

run:

    flutter build apk --release

The generated release APK is normally located at:

    build/app/outputs/flutter-apk/app-release.apk

The integrated Week 6 branch should be used when generating the final submission build.

---

# Known Issues and Limitations

- CareConnect currently focuses primarily on mobile interface and workflow behavior.
- The applications are not currently synchronized with a shared production backend.
- Authentication demonstrates the CareConnect role and sign-in workflow rather than a production authentication service.
- Application data is primarily local demonstration data.
- Platform-specific accessibility behavior can vary between physical devices, emulators, and simulators.
- Automated accessibility testing does not replace TalkBack and VoiceOver testing.
- Increased text scaling should be manually verified across critical workflows.
- Keyboard and assistive navigation should be manually verified on supported platforms.
- Maestro flows have starting-state preconditions that should be established before execution.

---

# Week 6 Verification Summary

Verified automated results currently include:

| Verification | Result |
| --- | --- |
| Flutter complete test suite | 26/26 passed |
| Flutter accessibility guideline tests | 4/4 passed |
| Flutter integration test | Passed |
| Flutter line coverage | 80.7% |
| React Native test suites | 4/4 passed |
| React Native tests | 30/30 passed |
| React Native integration test | Passed |
| React Native line coverage | 92.74% |
| React Native TypeScript validation | Passed |
| Maestro patient sign-in workflow | Tested |
| Maestro medication workflow | Passed |
| Maestro accessibility settings workflow | Passed |

Remaining manual submission evidence includes the required TalkBack and VoiceOver verification, screen-reader recordings, final accessibility documentation, and final submission artifacts.

---

# Team Member Contributions

| Team Member | Contribution |
| --- | --- |
| Matthew Spano | [Part 1] |
| Stephane Aloys Tekam Nwafor | [Part 2] |
| Jevon Brooks | [Part 3 & 4] |

---

# AI Usage Summary

AI assistance was used to support development, testing, troubleshooting, accessibility review, and project documentation.

AI-assisted activities included:

- Reviewing Flutter and React Native project structure
- Supporting accessibility implementation and review
- Assisting with Flutter accessibility guideline testing
- Supporting Jest and React Native Testing Library configuration
- Supporting Flutter and React Native integration testing
- Assisting with Maestro E2E testing and troubleshooting
- Reviewing test coverage configuration and results
- Supporting TypeScript validation
- Assisting with Week 6 documentation

AI-assisted suggestions were reviewed and executed within the project environment before inclusion in the submission.
