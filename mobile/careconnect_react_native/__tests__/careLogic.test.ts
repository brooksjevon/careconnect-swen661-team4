import { describe, expect, test } from '@jest/globals';

import { appointments, careTasks, medications } from '../src/data/careData';
import {
  appointmentSummary,
  canFinishCareTask,
  medicationSummary,
  validateSignIn,
} from '../src/utils/careLogic';

describe('careLogic', () => {
  test('validateSignIn returns errors when email and password are empty', () => {
    const result = validateSignIn('', '');

    expect(result.isValid).toBe(false);
    expect(result.emailError).toBe('Enter your email.');
    expect(result.passwordError).toBe('Enter your password.');
  });

  test('validateSignIn accepts non-empty email and password', () => {
    const result = validateSignIn('test@careconnect.com', 'test123');

    expect(result.isValid).toBe(true);
    expect(result.emailError).toBe('');
    expect(result.passwordError).toBe('');
  });

  test('medicationSummary creates a plain-language medication summary', () => {
    const result = medicationSummary(medications[0]);

    expect(result).toContain('Lisinopril');
    expect(result).toContain('10 mg');
    expect(result).toContain('Take 1 tablet');
  });

  test('appointmentSummary creates a plain-language appointment summary', () => {
    const result = appointmentSummary(appointments[0]);

    expect(result).toContain('Dr. Stephane Nwafor');
    expect(result).toContain('Monday, August 31');
    expect(result).toContain('10:30 AM');
  });

  test('canFinishCareTask returns false when not all steps are complete', () => {
    const task = careTasks[0];

    const result = canFinishCareTask([`${task.id}-step-0`], task);

    expect(result).toBe(false);
  });

  test('canFinishCareTask returns true when all steps are complete', () => {
    const task = careTasks[0];

    const completedSteps = task.instructions.map(
      (_, index) => `${task.id}-step-${index}`,
    );

    const result = canFinishCareTask(completedSteps, task);

    expect(result).toBe(true);
  });
});
