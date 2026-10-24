import type { CareState } from "./types"

/** Demo data used on first load (or when saved data is missing or unreadable). */
export const seedState: CareState = {
  signedIn: false,
  role: null,
  appointments: [
    { id: "a1", title: "Annual health review", date: "2026-09-30", time: "10:00", location: "Greenfield Surgery", caregiver: "Maria Thompson" },
    { id: "a2", title: "Blood test", date: "2026-10-03", time: "09:00", location: "Greenfield Surgery", caregiver: "Book transport" },
    { id: "a3", title: "GP phone call", date: "2026-10-16", time: "11:00", location: "Telephone appointment", caregiver: "The GP will call you" },
    { id: "a4", title: "Dentist check-up", date: "2026-10-19", time: "14:00", location: "Westfield Dental", caregiver: "Joyce Miller" },
  ],
  notes: [
    { id: "n1", date: "Today · 9:15 am", priority: "Routine", copy: "Margaret ate all of her breakfast and seemed cheerful this morning.", author: "Maria Thompson" },
    { id: "n2", date: "Yesterday · 6:40 pm", priority: "Urgent", copy: "Please check the repeat prescription before Friday. There are only two tablets left.", author: "Joyce Miller" },
    { id: "n3", date: "Monday · 2:30 pm", priority: "Routine", copy: "Lovely walk in the garden. Margaret remembered the roses near the back gate.", author: "Maria Thompson" },
  ],
  activities: [
    { id: "e1", time: "8:12 am", title: "Marked Memantine as taken", type: "Medicines" },
    { id: "e2", time: "10:15 am", title: "Checked in at 10:15 am", type: "Check-ins" },
    { id: "e3", time: "10:30 am", title: "Task completed: Morning walk", type: "Tasks" },
    { id: "e4", time: "12:30 pm", title: "Unmarked Amlodipine", type: "Medicines" },
    { id: "e5", time: "3:00 pm", title: "Marked Vitamin D3 as taken", type: "Medicines" },
  ],
}
