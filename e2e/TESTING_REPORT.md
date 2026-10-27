# CareConnect — Assignment 11 E2E Testing Report

Date: October 27, 2026

## Deployment

Production URL:
https://careconnect-week11.vercel.app

## Automated E2E Results

| Test | Browser | Result |
|---|---|---|
| Care Recipient login and dashboard | Chromium | PASS |
| Care Recipient login and dashboard | WebKit | PASS |
| Caregiver login and dashboard | Chromium | PASS |
| Appointment viewing and details | Chromium | PASS |
| Care Notes navigation | Chromium | PASS |

Total: 5/5 executed tests passed.

## Verified Functionality

- Demo sign-in and role selection
- Care Recipient dashboard access
- Caregiver dashboard access
- Appointment page navigation
- Four appointment headings displayed
- Three appointment directions links present
- Care Notes navigation and page heading

## Cross-Browser Limitations

Firefox testing was blocked by a Playwright browser
launch timeout on macOS, accompanied by sandbox and
graphics compositor errors.

Firefox application compatibility remains unverified.

## Code Coverage

Root repository tests:
- 44/44 tests passed
- Statements: 76.6%
- Branches: 72.0%
- Functions: 57.14%
- Lines: 76.6%

Important: These coverage figures apply to the root
src directory, not the deployed Webb/src application.
Webb-specific code coverage has not been established.

## Lighthouse Audit

Mobile sign-in page:
- Performance: 99
- Accessibility: 100
- Best Practices: 100
- SEO: 100

These scores apply to the audited sign-in page,
not necessarily every application route.

## Evidence

- careconnect.spec.mjs
- test-results.json
- chromium-recipient-dashboard.png
- webkit-recipient-dashboard.png
- chromium-caregiver-dashboard.png
- chromium-appointments.png
- chromium-care-notes.png

## Reproduction

From the repository root, with Playwright installed:

node e2e/careconnect.spec.mjs
