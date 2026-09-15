# React Native Week 5 Testing Status

The React Native CareConnect app has Jest and React Native Testing Library tests added for the Week 5 React Native implementation.

## Current status

- careLogic.test.ts passes.
- App.test.tsx is still failing.
- The current failure appears related to React Native Testing Library interaction timing and state updates around role selection and sign-in.
- App screens are rendering, but some tests are not waiting correctly for role and navigation updates.

## Commands to run

From the React Native app folder:

cd mobile/careconnect_react_native
npm.cmd install
npx.cmd tsc --noEmit
npm.cmd test

## Help needed

Please review __tests__/App.test.tsx, especially:

- role button selection
- sign-in button state change from Patient to Caregiver or Provider
- use of waitFor, userEvent, and fireEvent
- possible need to test screens individually instead of testing the full app at once

## Goal

Get the React Native Week 5 test suite passing and increase coverage toward the Week 5 testing requirement.
