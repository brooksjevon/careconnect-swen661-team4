# SWEN 661 — Team 4 — Week 5 React Native UI Development

## Project Description

CareConnect is a daily companion application designed for care recipients, including individuals with dyslexia, and their caregivers, helping users stay organized, manage healthcare activities, and remain connected throughout the day.

For Week 5, the CareConnect mobile user interface was implemented using **React Native with Expo and TypeScript**. This implementation builds on the CareConnect design and workflows established during previous development while providing a React Native version of the mobile application.

The React Native application currently provides the following feature areas:

* **Authentication** — sign-in interface with Patient, Caregiver, and Provider role options
* **Home** — role-based dashboard displaying important care information and upcoming actions
* **Medications** — medication information and medication completion tracking
* **Appointments** — appointment details and preparation checklist
* **Care Plan** — step-by-step care task instructions and completion tracking
* **Schedule** — daily schedule and activity completion tracking
* **My Health** — patient health summary information
* **Accessibility** — configurable accessibility and reading-support settings

The application uses **React Navigation** with bottom-tab navigation to provide access to the major CareConnect feature areas after sign-in.

Accessibility support is integrated throughout the application. Features include accessible labels and roles, adjustable text sizing, wider text spacing, multiple visual themes, and read-aloud assistance using `expo-speech`. Reusable components such as `AccessibleCard`, `ReadAloudButton`, `ThemedScreen`, and `ThemeBackground` support consistent accessibility behavior throughout the interface.

Global application state is managed through `AppContext.tsx`, which maintains the selected user role, application theme, text scale, spacing preference, and read-aloud setting.

The current Week 5 implementation focuses on the React Native user interface, accessibility features, application workflows, and automated testing. Application data is currently provided locally and is not yet synchronized with a production backend or shared production database.

**Tech Stack:** React Native 0.86.3, React 19.2.3, Expo SDK 57, TypeScript, React Navigation, Expo Speech, Jest, and React Native Testing Library.

---

## React Native Project Location

The Week 5 React Native application is located under:

```text
mobile/careconnect_react_native/
```

The primary project structure includes:

```text
careconnect_react_native/
├── __tests__/
│   ├── App.test.tsx
│   └── careLogic.test.ts
├── assets/
├── src/
│   ├── components/
│   ├── context/
│   ├── data/
│   ├── models/
│   ├── navigation/
│   ├── screens/
│   ├── theme/
│   └── utils/
├── App.tsx
├── app.json
├── index.ts
├── jest.setup.js
├── package.json
└── tsconfig.json
```

---

## How to Run the App

From the repository root:

```bash
cd mobile/careconnect_react_native
npm install
npm start
```

This starts the Expo development server.

The application can also be started directly for a supported platform.

### Android

```bash
npm run android
```

### iOS

```bash
npm run ios
```

### Web

```bash
npm run web
```

When using Expo, the application can be launched through an available emulator, simulator, supported browser, or compatible development device.

---

## Requirements

* Node.js
* npm
* Expo
* Android Studio and Android SDK for Android emulator testing
* Xcode for iOS Simulator testing on macOS
* A compatible physical device or emulator/simulator for mobile testing

Install all project dependencies before starting the application:

```bash
npm install
```

The current React Native application can run without backend or server configuration because the implemented Week 5 workflows use local application data.

---

## Implemented Application Features

### Authentication and Roles

The sign-in interface provides three CareConnect user-role options:

* Patient
* Caregiver
* Provider

Email and password fields include validation before allowing the user to enter the main application.

### Home Dashboard

The Home screen provides role-aware CareConnect information and displays important care information such as:

* Next important action
* Upcoming appointment
* Current care task
* Care team information

The dashboard also provides access to reading assistance and theme options.

### Medications

The Medications screen displays medication information including medication name, dosage, instructions, and timing. Users can mark medication activities as completed.

### Appointments

The Appointments screen presents appointment information and provides an appointment-preparation checklist to help users prepare for upcoming healthcare visits.

### Care Plan

The Care Plan screen presents care activities as manageable steps. Individual instructions can be marked complete, and the overall care task can be finished after the required steps have been completed.

### Schedule

The Schedule screen displays daily activities with their associated times and descriptions. Schedule items can be marked as completed.

### My Health

The My Health screen provides a simplified summary of patient health information in an accessible card-based interface.

### Accessibility

A dedicated Accessibility screen allows users to configure reading and display preferences.

Current accessibility features include:

* Multiple appearance themes
* Adjustable text size
* Wider text spacing
* Read-aloud assistance
* Accessible labels
* Accessibility roles and states
* Accessible reusable cards and controls

Read-aloud functionality is implemented using:

```text
expo-speech
```

These features are intended to reduce reading difficulty and improve navigation for users who may benefit from additional accessibility support, including users with dyslexia.

---

## Navigation

The React Native implementation uses **React Navigation** and a bottom-tab interface.

After successful sign-in, users can navigate between:

```text
Home
Medications
Appointments
Care Plan
Schedule
My Health
Accessibility
```

Navigation icons are provided through Expo Vector Icons.

---

## Application State and Theming

Global application settings are maintained through:

```text
src/context/AppContext.tsx
```

The application context manages:

* Current CareConnect role
* Selected application theme
* Text scaling
* Wider text spacing
* Read-aloud preference

Theme definitions are maintained within:

```text
src/theme/theme.ts
```

This allows accessibility and appearance preferences to be applied consistently throughout the application.

---

## How to Run Tests

From the React Native application directory:

```bash
cd mobile/careconnect_react_native
npm install
npm test
```

The Week 5 test suite uses:

* **Jest**
* **React Native Testing Library**
* **jest-expo**

The current test suite contains:

```text
2 passing test suites
18 passing tests
```

Test files include:

```text
__tests__/App.test.tsx
__tests__/careLogic.test.ts
```

The automated tests cover application behavior including:

* Sign-in role options
* Sign-in validation
* Home dashboard content
* Medication completion
* Appointment preparation checklist
* Care Plan checklist behavior
* Care task completion
* Schedule completion
* Health summary information
* Accessibility settings
* Reusable accessible cards
* Read-aloud button behavior

To run the tests without generating the full coverage workflow manually:

```bash
npm test
```

A watch-mode test command is also available:

```bash
npm run test:watch
```

---

## TypeScript Validation

The React Native implementation uses TypeScript.

Type checking can be performed with:

```bash
npx tsc --noEmit
```

This checks the TypeScript source without generating compiled output.

---

## Test Coverage Report

The Week 5 Jest configuration automatically collects code coverage when the standard test command is executed:

```bash
npm test
```

Coverage is collected from the React Native source files under:

```text
src/**/*.{ts,tsx}
```

with selected model, navigation, declaration, and placeholder files excluded from coverage collection.

The generated Jest coverage report is located under:

```text
mobile/careconnect_react_native/coverage/
```

The HTML coverage report entry point is:

```text
mobile/careconnect_react_native/coverage/lcov-report/index.html
```

On macOS, the generated HTML report can be opened with:

```bash
open coverage/lcov-report/index.html
```

---

## Key Dependencies

The Week 5 React Native implementation uses the following major dependencies:

```text
React Native
React
Expo
TypeScript
React Navigation
Expo Vector Icons
Expo Speech
React Native Safe Area Context
React Native Screens
Jest
React Native Testing Library
jest-expo
```

These dependencies provide the application's mobile framework, navigation, accessibility support, TypeScript development environment, and automated testing infrastructure.

---

## Known Issues or Limitations

* The React Native application is not yet connected to a production backend or API.
* Application information currently uses locally defined CareConnect data.
* Application data is not currently synchronized with other CareConnect implementations.
* Persistent/shared production data storage has not yet been integrated.
* Authentication currently demonstrates the CareConnect sign-in workflow and role selection rather than production authentication.
* Some application functionality represents UI and workflow behavior intended for continued development and backend integration.
* Physical-device and platform-specific behavior may vary depending on Expo, Android, and iOS development environments.

---

## Team Member Contributions This Week

| Team Member                 | Contribution |
| --------------------------- | ------------ |
| Jonay Simmons               | [Part 1]     |
| Stephane Aloys Tekam Nwafor | [Part 2]     |
| Jevon Brooks                | [Part 2 & 3] |

---

## AI Usage Summary

AI assistance was used during Week 5 to support React Native development, testing, troubleshooting, accessibility review, and project documentation.

AI-assisted activities included:

* Reviewing the React Native and Expo project structure.
* Providing guidance for React Native application setup and execution.
* Assisting with React Navigation and application workflow development.
* Supporting accessibility implementation and review.
* Assisting with Jest and React Native Testing Library configuration.
* Supporting automated test development and troubleshooting.
* Reviewing test coverage configuration and reporting.
* Providing guidance for TypeScript validation.
* Assisting with documentation of the Week 5 React Native implementation.

AI-generated or AI-assisted suggestions were reviewed and executed by team members within the project environment before inclusion in the Week 5 submission.
