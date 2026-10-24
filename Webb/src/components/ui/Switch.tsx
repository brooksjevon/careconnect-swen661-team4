type SwitchProps = {
  /** Accessible name for the switch (e.g. "Voice reading"). */
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}

/** On/off toggle built on a native checkbox, so it works with keyboard and screen readers. */
export function Switch({ label, checked, onChange }: SwitchProps) {
  return (
    <label className="switch">
      <input
        type="checkbox"
        role="switch"
        aria-label={label}
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
      />
      <span aria-hidden="true" />
      <b aria-hidden="true">{checked ? "On" : "Off"}</b>
    </label>
  )
}
