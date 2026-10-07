# CareConnect Desktop — Electron + React + Vite

This rebuild uses an explicit Electron desktop architecture instead of putting the whole UI in one JavaScript file.

## Stack
- Electron: native desktop shell and application lifecycle
- React 18: UI components and screens
- React Router: patient/caregiver navigation
- Vite: React development/build pipeline
- electron-builder: Windows/macOS/Linux packaging
- lucide-react: interface icons

## Electron files
The desktop framework is in `electron/`:

- `electron/main.cjs` — Electron main process; creates `BrowserWindow`
- `electron/preload.cjs` — secure preload bridge using `contextBridge`
- `package.json` — has `"main": "electron/main.cjs"` and the Electron dependencies/scripts

Security defaults used:
- `contextIsolation: true`
- `nodeIntegration: false`
- `sandbox: true`

## Organized screens

### Public / authentication
- `/` — Landing
- `/signin`
- `/signup`
- `/choose-role`

### Patient
- `/patient/home`
- `/patient/today`
- `/patient/schedule`
- `/patient/medications`
- `/patient/appointments`
- `/patient/memories`
- `/patient/contacts`

### Caregiver
- `/caregiver/dashboard`
- `/caregiver/medications`
- `/caregiver/appointments`
- `/caregiver/activity`
- `/caregiver/notes`

## Run in development

```powershell
npm install
npm run dev
```

Vite starts on port 5173. `wait-on` waits for Vite, then Electron launches the desktop window.

## Build the React renderer

```powershell
npm run build
```

## Run the built renderer inside Electron

```powershell
npm run build
npm start
```

## Build a desktop installer

```powershell
npm run dist
```

On Windows, electron-builder is configured to create an NSIS installer under `release/`.

## Structure

```text
careconnect-electron-react/
├── electron/
│   ├── main.cjs
│   └── preload.cjs
├── src/
│   ├── components/
│   │   ├── Brand.jsx
│   │   ├── Sidebar.jsx
│   │   ├── TopBar.jsx
│   │   └── UI.jsx
│   ├── data/
│   │   └── mockData.js
│   ├── layouts/
│   │   ├── AppLayout.jsx
│   │   └── AuthLayout.jsx
│   ├── pages/
│   │   ├── auth/
│   │   ├── patient/
│   │   └── caregiver/
│   ├── styles/
│   │   └── global.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── vite.config.js
└── package.json
```

## Current implementation status

The desktop UI and navigation are implemented from the supplied CareConnect screen designs. Forms use local React state/demo data where useful. Authentication, persistence, a real database, backend API calls, desktop notifications, and production medication/clinical logic are intentionally not faked and should be connected as the next application layer.

## Desktop core features
- Electron main process owns BrowserWindow, native menus, app lifecycle, window state, and OS actions.
- React renderer owns UI and routing; preload exposes only narrow IPC methods.
- Native File/Edit/View/Help menu with local accelerators.
- Desktop navigation: Home/Today/Schedule, back/forward, role switching, reload, zoom and fullscreen.
- Window size, position and maximized state persist to Electron userData/window-state.json; off-screen positions are rejected when displays change.

Run: `npm install` then `npm run dev`. Production-style local run: `npm start`.

## Navigation fix

This build adds explicit renderer navigation history for Electron menu and keyboard navigation.

Test:
1. Open Patient Home.
2. Navigate to Medications.
3. Navigate to Appointments.
4. Press Alt+Left twice.
5. Press Alt+Right once.
6. Test View > Back and View > Forward.

The top bar also contains visible Back/Forward controls.


## Full keyboard navigation

The application can now be operated without a mouse.

- `Tab` / `Shift+Tab`: move through interactive controls.
- `Enter` / `Space`: activate the focused control.
- `Up` / `Down`: move focus through the sidebar.
- `Left` / `Right`: navigate to the previous/next application section.
- `Alt+Left` / `Alt+Right`: back/forward through route history.
- `Ctrl+1` through `Ctrl+7`: jump directly to role-specific sections.
- `Ctrl+Shift+R`: open the role chooser.
- `Ctrl+/`: open the keyboard shortcut reference.
- `Escape`: close dialogs or clear current focus.

Inputs, textareas, and selects retain their normal keyboard behavior, so arrow keys are not hijacked while editing a form. All interactive elements receive a high-visibility focus ring, and the app includes a keyboard-accessible "Skip to main content" link.

## Settings and personalization
A Settings tab is available in both Patient and Caregiver sidebars.

Settings are saved automatically in localStorage and restored at startup:
- Font size: Small, Medium, Large, Extra Large
- Display mode: Light / Dark
- Theme: Ocean, Emerald, Violet, Warm
- Reset to defaults

All Settings controls are keyboard accessible with Tab, Shift+Tab, Enter, and Space.

## Accessibility-first whole-application keyboard navigation

Directional navigation now uses spatial geometry across the entire renderer rather than being limited to the sidebar. Arrow keys find the nearest visible interactive element in the requested direction. This works across cards, buttons, links, forms, settings controls, role selection, header controls, and side navigation.

- Arrow keys: spatial movement across the current screen
- Tab / Shift+Tab: deterministic DOM-order navigation
- Enter / Space: activate
- Home / End: first / last control in the current keyboard region
- Page Up / Page Down: previous / next region
- Alt+Left / Alt+Right: route-history back / forward
- Ctrl+number: direct section access
- Escape: close modal or return focus toward current navigation
- Ctrl+/: keyboard guide

Native arrow-key behavior is preserved inside input, textarea, and select controls. Route changes place focus at the new page heading/content to provide clear context.

## Architecture, security, and quality checks

Structure:
- `electron/main.cjs` — privileged Electron main process
- `electron/preload.cjs` — narrow contextBridge / IPC boundary
- `renderer/` — unprivileged React + Vite renderer
- `renderer/src/` — React pages, layouts, components, settings, mock data
- `eslint.config.js` — lint rules for renderer, Electron CommonJS, and Vite config

Security hardening:
- context isolation enabled
- renderer Node integration disabled
- Chromium sandbox enabled globally and per BrowserWindow
- webSecurity enabled; insecure content disabled
- renderer navigation restricted to the local app/dev origin
- new-window creation denied
- external URLs use an explicit allowlist
- IPC handlers validate the sender
- preload exposes narrow methods instead of raw ipcRenderer
- Content Security Policy is defined
- Electron security warnings are explicitly enabled during Electron development

Quality commands:
- `npm run lint`
- `npm run build`
- `npm run check` (lint + build)


## Target platform: Windows

CareConnect now explicitly targets Windows desktop.

### Native Windows integration
- Electron native application menu (File, Edit, View, Help)
- Windows desktop notifications through Electron `Notification`
- Windows AppUserModelID: `com.careconnect.desktop`
- Keyboard accelerators use Windows `Ctrl`, `Alt`, function-key conventions
- React remains isolated in the renderer process

### Windows installer
The project uses electron-builder with the NSIS target.

Create the Windows installer from Windows:
```powershell
npm install
npm run dist:win
```

Output is written to `release/` with a name similar to:
`CareConnect-Setup-1.0.0-x64.exe`

The NSIS installer:
- allows the user to select an installation directory
- creates a Desktop shortcut
- creates a Start Menu shortcut
- provides a standard Windows uninstaller

For an unpacked Windows test build:
```powershell
npm run pack:win
```

### Notifications
Settings contains a **Test notification** button. Notifications are requested through the narrow preload bridge and created by the Electron main process; the renderer does not receive Node/Electron privileges.

## Windows desktop accessibility

CareConnect targets Windows.

Already present and preserved:
- whole-application keyboard navigation
- strong visible focus indicators

Added in this build:
- screen-reader route announcements and semantic navigation landmarks
- Windows Contrast Theme / High Contrast support using `forced-colors`
- reduced-motion support
- `ACCESSIBILITY_TEST_PLAN.md` for manual Windows verification with NVDA and Contrast Themes

Manual accessibility verification was performed using keyboard-only navigation and visible focus indicators. Screen-reader behavior was manually verified with VoiceOver on macOS, and increased-contrast behavior was also manually checked on macOS. Windows-specific NVDA and Contrast Theme procedures remain documented in ACCESSIBILITY_TEST_PLAN.md.

## Unit tests

CareConnect now uses Jest for business-logic unit tests and React Testing Library for renderer component tests.

Commands:
```powershell
npm install
npm test
npm run test:watch
npm run test:coverage
npm run check
```

Current tests cover:
- settings defaults, persistence/merge behavior, font-size rules, and theme validation
- shared React UI components
- keyboard activation of buttons
- Patient/Caregiver sidebar rendering and current-page semantics
- SettingsProvider updates, persistence, DOM theme application, and reset behavior

`npm run check` runs ESLint, Jest, and the production Vite build.

## Expanded page and accessibility unit tests
Additional Jest/React Testing Library suites cover PatientHome, Medications, Appointments,
CaregiverDashboard, ManageMedications, Settings, SignIn, SignUp, and DesktopController.
The tests also exposed unlabeled form controls; those labels are now explicitly associated
with their inputs, improving NVDA support as well as testability.


## Test commands

```powershell
npm test
npm run test:coverage
npm run test:integration
npm run test:all
npm run check
```

`test:all` runs the renderer/unit suite followed by the Electron IPC/window-management integration suite.
`check` runs ESLint, all tests, and the production Vite build.


### Integration test HTML coverage report

Generate the Electron integration-test coverage report:

```powershell
npm run test:integration:coverage
```

Open the HTML report on Windows:

```powershell
start .\coverage\integration\lcov-report\index.html
```

The report covers the Electron main/preload integration code and is written under `coverage/integration/`.

## Assignment 8 Final Verification

The CareConnect Electron desktop application was verified on Windows x64 on October 6, 2026.

### Automated verification

The following command was used for the final quality check:

```powershell
npm run check

```

Final results:

- ESLint: Passed with zero lint warnings/errors
- Jest / React Testing Library: 11 test suites passed
- Unit and component tests: 50/50 passed
- Electron integration tests: 2 test suites passed
- Integration tests: 6/6 passed
- Vite production build: Passed

### Code coverage

Generate the unit/component coverage report with:

```powershell
npm run test:coverage
```

Final measured coverage:

- Statements: 90.90% (250/275)
- Branches: 86.44% (153/177)
- Functions: 90.62% (87/96)
- Lines: 95.59% (152/159)

All reported coverage metrics exceed the Assignment 8 minimum requirement of 60%.

The HTML coverage report is generated at:

```text
coverage/lcov-report/index.html
```

On Windows, open it with:

```powershell
start .\coverage\lcov-report\index.html
```

### Manual desktop verification

The following Electron desktop functionality was manually verified:

- CareConnect launches successfully as a native desktop application.
- Native File, Edit, View, and Help menus are available on Windows.
- Keyboard-only navigation works throughout the application.
- `Ctrl+/` opens the Keyboard Navigation reference.
- Visible focus indicators are displayed during keyboard navigation.
- Window size and position are restored after closing and relaunching the application.
- The React renderer loads and navigation operates correctly.

### Accessibility verification

Manual accessibility verification included:

- Keyboard-only navigation using Tab, Shift+Tab, Enter, Space, and application shortcuts.
- Visible focus indicators during keyboard navigation.
- Screen-reader verification using VoiceOver on macOS.
- Increased-contrast verification on macOS and manual Windows High Contrast verification on the installed Windows build.
- Windows-specific `forced-colors` support was manually verified with Windows High Contrast enabled.
- Semantic navigation, form labels, route announcements, and reduced-motion support are included in the application.

See `ACCESSIBILITY_TEST_PLAN.md` for the Windows accessibility acceptance-test procedure.

### Windows x64 installer verification

The final Windows x64 installer was generated natively on Windows with:

```powershell
npm run dist:win
```

The resulting NSIS installer is:

```text
release/CareConnect-Setup-1.0.0-x64.exe
```

The installer was manually executed on Windows. CareConnect installed successfully and the installed application launched successfully.

The Windows installer is distributed separately as a submission artifact and generated build output is not committed to the source repository.
