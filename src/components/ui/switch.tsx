import * as React from "react"

export interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ checked, ...props }, ref) => (
    <label style={{ display: "inline-flex", alignItems: "center", cursor: "pointer" }}>
      <input
        type="checkbox"
        checked={checked}
        ref={ref}
        {...props}
        style={{ width: 40, height: 20, accentColor: "#2563eb" }}
      />
      <span style={{ marginLeft: 8 }}>{checked ? "On" : "Off"}</span>
    </label>
  )
)

Switch.displayName = "Switch"