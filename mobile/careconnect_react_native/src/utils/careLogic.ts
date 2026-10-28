import {
  Appointment,
  CareConnectRole,
  CareTask,
  Medication,
} from '../models/types';

export const roleLabels: Record<CareConnectRole, string> = {
  patient: 'Patient',
  caregiver: 'Caregiver',
  provider: 'Provider',
};

export function validateSignIn(email: string, password: string) {
  return {
    emailError: email.trim() ? '' : 'Enter your email.',
    passwordError: password.trim() ? '' : 'Enter your password.',
    isValid: Boolean(email.trim() && password.trim()),
  };
}

export function medicationSummary(medication: Medication) {
  return `${medication.name} ${medication.dose}. ${medication.take}. ${medication.when}.`;
}

export function appointmentSummary(appointment: Appointment) {
  return `${appointment.provider}. ${appointment.date} at ${appointment.time}. ${appointment.reason}.`;
}

export function canFinishCareTask(
  completedStepIds: string[],
  task: CareTask,
) {
  return task.instructions.every((_, index) =>
    completedStepIds.includes(`${task.id}-step-${index}`),
  );
}
