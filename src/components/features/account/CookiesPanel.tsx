import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

export function CookiesPanel() {
  const [analytics, setAnalytics] = useState(true)
  const [personalization, setPersonalization] = useState(false)

  return (
    <section className="space-y-8">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold">Cookies</h1>
        <p className="text-muted-foreground">
          Manage your cookie and privacy preferences.
        </p>
      </header>

      <div className="divide-y divide-border">
        <ToggleRow
          title="Essential cookies"
          desc="Required for the site to work. Always on."
          checked
          disabled
        />
        <ToggleRow
          title="Analytics"
          desc="Helps us understand how the site is used."
          checked={analytics}
          onChange={setAnalytics}
        />
        <ToggleRow
          title="Personalization"
          desc="Tailors content and recommendations to your preferences."
          checked={personalization}
          onChange={setPersonalization}
        />
      </div>

      <Button size="sm">Save preferences</Button>
    </section>
  )
}

function ToggleRow({
  title,
  desc,
  checked,
  onChange,
  disabled,
}: {
  title: string
  desc: string
  checked: boolean
  onChange?: (value: boolean) => void
  disabled?: boolean
}) {
  return (
    <div className="flex items-center justify-between gap-6 py-4">
      <div className="space-y-0.5">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">{desc}</p>
      </div>
      <Switch
        checked={checked}
        onCheckedChange={onChange}
        disabled={disabled}
        aria-label={title}
      />
    </div>
  )
}
