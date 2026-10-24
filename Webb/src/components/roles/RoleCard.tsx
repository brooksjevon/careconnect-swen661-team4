import { Button } from "@/components/ui/Button"
import { Card, type CardTone } from "@/components/ui/Card"
import { Icon } from "@/components/ui/Icon"

type RoleCardProps = {
  icon: string
  title: string
  description: string
  actionLabel: string
  tone: CardTone
  onChoose: () => void
}

export function RoleCard({ icon, title, description, actionLabel, tone, onChoose }: RoleCardProps) {
  return (
    <Card tone={tone}>
      <Icon className="role-icon" src={icon} size={32} />
      <h2>{title}</h2>
      <p>{description}</p>
      <Button onClick={onChoose} full>
        {actionLabel} →
      </Button>
    </Card>
  )
}
