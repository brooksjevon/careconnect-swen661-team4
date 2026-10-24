import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { Switch } from "@/components/ui/Switch"
import { usePreferences } from "@/hooks/usePreferences"

export function VoiceReadingSettings() {
  const { voiceEnabled, setVoiceEnabled, readPage, stopReading } = usePreferences()

  return (
    <Card>
      <div className="setting-row">
        <div>
          <h2>Voice reading</h2>
          <p>Show a listening control in the header that reads the current page aloud.</p>
        </div>
        <Switch label="Voice reading" checked={voiceEnabled} onChange={setVoiceEnabled} />
      </div>
      <div className="button-row">
        <Button kind="secondary" onClick={readPage}>
          Test voice reading
        </Button>
        <Button kind="quiet" onClick={stopReading}>
          Stop reading
        </Button>
      </div>
    </Card>
  )
}
