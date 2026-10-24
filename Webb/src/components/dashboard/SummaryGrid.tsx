import { Card } from "@/components/ui/Card"
import type { SummaryItem } from "@/data/dashboard"

export function SummaryGrid({ items }: { items: SummaryItem[] }) {
  return (
    <div className="summary-grid">
      {items.map(({ label, value }) => (
        <Card key={label}>
          <span>{label}</span>
          <strong>{value}</strong>
        </Card>
      ))}
    </div>
  )
}
