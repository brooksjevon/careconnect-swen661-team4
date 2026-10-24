import { Button } from "./Button"

type FilterButtonsProps<T extends string> = {
  label: string
  options: readonly T[]
  value: T
  onChange: (value: T) => void
}

/** A row of toggle buttons where exactly one option is selected. */
export function FilterButtons<T extends string>({ label, options, value, onChange }: FilterButtonsProps<T>) {
  return (
    <div className="filter-row" role="group" aria-label={label}>
      {options.map((option) => (
        <Button
          key={option}
          kind={option === value ? "primary" : "secondary"}
          pressed={option === value}
          onClick={() => onChange(option)}
        >
          {option}
        </Button>
      ))}
    </div>
  )
}
