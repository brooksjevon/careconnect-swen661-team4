import { VoiceReadingSettings } from "@/components/settings/VoiceReadingSettings"
import { Card } from "@/components/ui/Card"
import { ChoiceGroup, type Choice } from "@/components/ui/ChoiceGroup"
import { PageHeading } from "@/components/ui/PageHeading"
import type { TextSize, Theme } from "@/context/preferencesContext"
import { usePreferences } from "@/hooks/usePreferences"

const textSizeChoices: Choice<TextSize>[] = [
  { value: "standard", title: "Standard", description: "The default CareConnect text size." },
  { value: "large", title: "Large", description: "Larger text throughout the app." },
  { value: "extra-large", title: "Extra large", description: "The largest, most readable option." },
]

const themeChoices: Choice<Theme>[] = [
  { value: "light", title: "Light", description: "Bright surfaces and dark text." },
  { value: "dark", title: "Dark", description: "Reduced brightness with light text." },
  { value: "calm", title: "Calm blue", description: "A softer blue-tinted background." },
]

export function SettingsPage() {
  const { textSize, theme, setTextSize, setTheme } = usePreferences()

  return (
    <>
      <PageHeading title="Settings" subtitle="Make CareConnect more comfortable for you to read and use." />

      <div className="settings-stack">
        <Card>
          <ChoiceGroup label="Text size" value={textSize} onChange={setTextSize} choices={textSizeChoices} />
        </Card>
        <Card>
          <ChoiceGroup label="Colour theme" value={theme} onChange={setTheme} choices={themeChoices} />
        </Card>
        <VoiceReadingSettings />
        <Card tone="blue">
          <p className="eyebrow">Preview</p>
          <h2>This is how your text will look</h2>
          <p>
            Your settings are saved on this device and will still be here the next time you open
            CareConnect.
          </p>
        </Card>
      </div>
    </>
  )
}
