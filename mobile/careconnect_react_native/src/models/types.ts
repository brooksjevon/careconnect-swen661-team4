export type CareConnectRole = 'patient' | 'caregiver' | 'provider';

export type ThemeOption =
  | 'neutral'
  | 'blueGreen'
  | 'purplePink'
  | 'kids';

export type Medication = {
  id: string;
  name: string;
  dose: string;
  take: string;
  when: string;
  purpose: string;
};

export type AppointmentPrepItem = {
  id: string;
  label: string;
};

export type Appointment = {
  id: string;
  provider: string;
  date: string;
  time: string;
  reason: string;
  prepItems: AppointmentPrepItem[];
};

export type CareTask = {
  id: string;
  title: string;
  instructions: string[];
};

export type ScheduleItem = {
  id: string;
  time: string;
  title: string;
  description: string;
};

export type HealthSummaryItem = {
  id: string;
  label: string;
  value: string;
  plainLanguage: string;
};
