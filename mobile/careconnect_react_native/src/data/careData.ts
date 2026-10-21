import {
  Appointment,
  CareTask,
  HealthSummaryItem,
  Medication,
  ScheduleItem,
} from '../models/types';

export const patientName = 'Jevon Brooks';
export const caregiverName = 'Jonay Simmons';
export const providerName = 'Stephane Nwafor';

export const medications: Medication[] = [
  {
    id: 'med-1',
    name: 'Lisinopril',
    dose: '10 mg',
    take: 'Take 1 tablet',
    when: 'Once each day',
    purpose: 'Used for high blood pressure',
  },
  {
    id: 'med-2',
    name: 'Vitamin D',
    dose: '1000 IU',
    take: 'Take 1 capsule',
    when: 'With food',
    purpose: 'Supports bone and immune health',
  },
];

export const appointments: Appointment[] = [
  {
    id: 'appt-1',
    provider: 'Dr. Stephane Nwafor',
    date: 'Monday, August 31',
    time: '10:30 AM',
    reason: 'Medication follow-up',
    prepItems: [
      {
        id: 'prep-1',
        label: 'Bring your medication list.',
      },
      {
        id: 'prep-2',
        label: 'Write down any new symptoms.',
      },
      {
        id: 'prep-3',
        label: 'Prepare one question for the provider.',
      },
    ],
  },
];

export const careTasks: CareTask[] = [
  {
    id: 'task-1',
    title: 'Drink Water',
    instructions: [
      'Drink water regularly.',
      'Pay attention to how you feel.',
      'Contact your caregiver if symptoms worsen.',
    ],
  },
];

export const scheduleItems: ScheduleItem[] = [
  {
    id: 'schedule-1',
    time: '8:00 AM',
    title: 'Morning Medication',
    description: 'Take Lisinopril with water.',
  },
  {
    id: 'schedule-2',
    time: '12:00 PM',
    title: 'Drink Water',
    description: 'Drink water and check how you feel.',
  },
  {
    id: 'schedule-3',
    time: '6:00 PM',
    title: 'Blood Pressure Check',
    description: 'Record your blood pressure reading.',
  },
];

export const healthSummary: HealthSummaryItem[] = [
  {
    id: 'health-1',
    label: 'Blood Pressure',
    value: 'Needs daily check',
    plainLanguage: 'Check and record blood pressure each evening.',
  },
  {
    id: 'health-2',
    label: 'Medication',
    value: '2 active medications',
    plainLanguage: 'Review each medication before marking it complete.',
  },
  {
    id: 'health-3',
    label: 'Care Support',
    value: 'Caregiver and provider assigned',
    plainLanguage: 'Jonay and Stephane are part of the care team.',
  },
];
