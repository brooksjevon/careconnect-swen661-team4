import AppLayout from '../../layouts/AppLayout'
import { Card, PageTitle, Button, SectionLabel } from '../../components/UI'
import { appointments } from '../../data/mockData'

export default function ManageAppointments() {
  return (
    <AppLayout role="caregiver">
      <PageTitle
        title="Manage appointments"
        subtitle="Add, edit, or remove Margaret's upcoming appointments"
        action={<Button tone="primary">✚ Add appointment</Button>}
      />

      <div className="editor-grid">
        <div>
          <SectionLabel>UPCOMING (3)</SectionLabel>
          {appointments.slice(0, 3).map((a) => (
            <Card className="editable-list" key={a.title}>
              <h2>{a.title}</h2>
              <b>{a.when}</b>
              <p>{a.location}</p>
              <div className="button-row">
                <Button>Edit</Button>
                <Button tone="danger">Delete</Button>
              </div>
            </Card>
          ))}
        </div>

        <div>
          <SectionLabel>EDIT APPOINTMENT</SectionLabel>
          <Card className="form-card">
            <h2>Edit appointment</h2>

            <label htmlFor="appt-title">Appointment title (required) *</label>
            <input
              id="appt-title"
              defaultValue="Vision Plus Opticians"
              aria-label="Appointment title (required)"
            />

            <div className="two-col">
              <div>
                <label htmlFor="appt-date">Date (required) *</label>
                <input
                  id="appt-date"
                  defaultValue="2026-09-24"
                  aria-label="Date (required)"
                />
              </div>
              <div>
                <label htmlFor="appt-time">Time (required) *</label>
                <input
                  id="appt-time"
                  defaultValue="15:30"
                  aria-label="Time (required)"
                />
              </div>
            </div>

            <label htmlFor="appt-loc-type">Location type (required) *</label>
            <select
              id="appt-loc-type"
              defaultValue="Clinic visit"
              aria-label="Location type (required)"
            >
              <option>Clinic visit</option>
              <option>Phone call</option>
              <option>Home visit</option>
            </select>

            <label htmlFor="appt-loc-name">Location name (required) *</label>
            <input
              id="appt-loc-name"
              defaultValue="Vision Plus Opticians"
              aria-label="Location name (required)"
            />

            <label htmlFor="appt-address">Address</label>
            <input
              id="appt-address"
              defaultValue="22 High Street, Westfield"
              aria-label="Address"
            />

            <label htmlFor="appt-caregiver">Assigned caregiver</label>
            <input
              id="appt-caregiver"
              defaultValue="Maria Thompson"
              aria-label="Assigned caregiver"
            />

            <div className="button-row">
              <Button tone="primary">✓ Save changes</Button>
              <Button>Cancel</Button>
            </div>
          </Card>
        </div>
      </div>
    </AppLayout>
  )
}