import { useId } from "react"

type SelectFieldProps<T extends string> = {
  label: string
  value: T
  options: readonly T[]
  onChange: (value: T) => void
  className?: string
}

export function SelectField<T extends string>({ label, value, options, onChange, className = "" }: SelectFieldProps<T>) {
  const id = useId()

  return (
    <div className={`field ${className}`.trim()}>
      <label className="field__label" htmlFor={id}>
        {label}
      </label>
      <select
        id={id}
        className="field__input"
        value={value}
        onChange={(event) => onChange(event.target.value as T)}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}
