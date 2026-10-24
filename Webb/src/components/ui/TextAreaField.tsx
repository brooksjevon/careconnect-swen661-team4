import { useId, type TextareaHTMLAttributes } from "react"

type TextAreaFieldProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "className"> & {
  label: string
}

export function TextAreaField({ label, id, ...textareaProps }: TextAreaFieldProps) {
  const generatedId = useId()
  const fieldId = id ?? generatedId

  return (
    <div className="field">
      <label className="field__label" htmlFor={fieldId}>
        {label}
      </label>
      <textarea {...textareaProps} id={fieldId} className="field__input field__input--multiline" />
    </div>
  )
}
