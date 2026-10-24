import { useState } from "react"
import { ActivityTimeline } from "@/components/activity/ActivityTimeline"
import { FilterButtons } from "@/components/ui/FilterButtons"
import { PageHeading } from "@/components/ui/PageHeading"
import { ACTIVITY_FILTERS, ALL_ACTIVITY, useActivityLog, type ActivityFilter } from "@/hooks/useCareData"
import { useSession } from "@/hooks/useSession"

export function ActivityPage() {
  const { role } = useSession()
  const [filter, setFilter] = useState<ActivityFilter>(ALL_ACTIVITY)
  const events = useActivityLog(filter)

  return (
    <>
      <PageHeading
        title="Activity log"
        subtitle={
          role === "caregiver"
            ? "Margaret’s recent medication, check-ins, and completed tasks"
            : "Your recent medication, check-ins, and completed tasks"
        }
      />
      <FilterButtons label="Filter activity" options={ACTIVITY_FILTERS} value={filter} onChange={setFilter} />
      <ActivityTimeline title="Today" events={events} />
    </>
  )
}
