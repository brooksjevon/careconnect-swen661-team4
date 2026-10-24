import type { Activity } from "@/store"

type ActivityTimelineProps = {
  title: string
  events: Activity[]
}

export function ActivityTimeline({ title, events }: ActivityTimelineProps) {
  return (
    <section className="timeline" aria-label={`${title} activity`}>
      <h2>{title}</h2>
      {events.length === 0 && <p className="timeline__empty">No activity of this type yet.</p>}
      {events.map(({ id, time, title: eventTitle, type }) => (
        <article className="timeline__event" key={id}>
          <span className="timeline__dot" aria-hidden="true" />
          <time>{time}</time>
          <div>
            <h3>{eventTitle}</h3>
            <p>
              {type.toUpperCase()} · {time}
            </p>
          </div>
        </article>
      ))}
    </section>
  )
}
