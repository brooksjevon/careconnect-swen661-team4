import { useId, type InputHTMLAttributes } from "react"

type TextFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "className"> & {
  label: string
  hint?: string
}

/** Labelled input. Works controlled (`value` + `onChange`) or uncontrolled (`defaultValue`). */
export function TextField({ label, hint, required, type = "text", id, ...inputProps }: TextFieldProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const hintId = hint ? `${inputId}-hint` : undefined

  return (
    <div className="field">
      <label className="field__label" htmlFor={inputId}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      <input
        {...inputProps}
        id={inputId}
        className="field__input"
        type={type}
        required={required}
        aria-describedby={hintId}
      />
      {hint && (
        <span className="field__hint" id={hintId}>
          {hint}
        </span>
      )}
    </div>
  )
}
