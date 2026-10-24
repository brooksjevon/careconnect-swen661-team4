export type Choice<T extends string> = {
  value: T
  title: string
  description: string
}

type ChoiceGroupProps<T extends string> = {
  label: string
  value: T
  choices: Choice<T>[]
  onChange: (value: T) => void
}

export function ChoiceGroup<T extends string>({ label, value, choices, onChange }: ChoiceGroupProps<T>) {
  return (
    <fieldset className="choice-group">
      <legend>{label}</legend>
      <div className="choice-grid">
        {choices.map((choice) => (
          <label
            className={`choice-card${value === choice.value ? " is-selected" : ""}`}
            key={choice.value}
          >
            <input
              checked={value === choice.value}
              name={label}
              type="radio"
              value={choice.value}
              onChange={() => onChange(choice.value)}
            />
            <span>
              <strong>{choice.title}</strong>
              <small>{choice.description}</small>
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}
