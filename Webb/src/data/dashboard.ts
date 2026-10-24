export type SummaryItem = { label: string; value: string }

export const recipientSummary: SummaryItem[] = [
  { label: "Tasks done", value: "2 / 6" },
  { label: "Medicines left", value: "2 of 5" },
  { label: "Appointments", value: "2 this week" },
  { label: "Memory cards", value: "5 active items" },
]

export const caregiverSummary: SummaryItem[] = [
  { label: "Tasks completed", value: "2 / 6" },
  { label: "Medicines tracked", value: "3 of 5" },
  { label: "Appointments", value: "2 this week" },
  { label: "Notes this week", value: "3 updates" },
]

export type ScheduleItem = { time: string; title: string; copy: string; status?: string }

export const todaySchedule: ScheduleItem[] = [
  { time: "8:30 am", title: "Breakfast", copy: "Porridge and tea", status: "Done" },
  { time: "10:00 am", title: "Morning walk", copy: "Round the garden, 15 minutes" },
  { time: "12:30 pm", title: "Lunch", copy: "Sandwich and fruit" },
]
