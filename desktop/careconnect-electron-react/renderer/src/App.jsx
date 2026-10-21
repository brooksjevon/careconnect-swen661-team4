import DesktopController from './components/DesktopController'
import { Navigate, Route, Routes } from 'react-router-dom'
import Landing from './pages/auth/Landing'
import SignIn from './pages/auth/SignIn'
import SignUp from './pages/auth/SignUp'
import RoleChooser from './pages/auth/RoleChooser'
import PatientHome from './pages/patient/PatientHome'
import Today from './pages/patient/Today'
import Schedule from './pages/patient/Schedule'
import Medications from './pages/patient/Medications'
import Appointments from './pages/patient/Appointments'
import Memories from './pages/patient/Memories'
import Contacts from './pages/patient/Contacts'
import CaregiverDashboard from './pages/caregiver/CaregiverDashboard'
import ManageMedications from './pages/caregiver/ManageMedications'
import ManageAppointments from './pages/caregiver/ManageAppointments'
import ActivityLog from './pages/caregiver/ActivityLog'
import Notes from './pages/caregiver/Notes'
import Settings from './pages/Settings'

export default function App() {
  return <><DesktopController/><Routes>
    <Route path="/" element={<Landing />} />
    <Route path="/signin" element={<SignIn />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/choose-role" element={<RoleChooser />} />
    <Route path="/patient/home" element={<PatientHome />} />
    <Route path="/patient/today" element={<Today />} />
    <Route path="/patient/schedule" element={<Schedule />} />
    <Route path="/patient/medications" element={<Medications />} />
    <Route path="/patient/appointments" element={<Appointments />} />
    <Route path="/patient/memories" element={<Memories />} />
    <Route path="/patient/contacts" element={<Contacts />} />
    <Route path="/caregiver/dashboard" element={<CaregiverDashboard />} />
    <Route path="/caregiver/medications" element={<ManageMedications />} />
    <Route path="/caregiver/appointments" element={<ManageAppointments />} />
    <Route path="/caregiver/activity" element={<ActivityLog />} />
    <Route path="/caregiver/notes" element={<Notes />} />
    <Route path="/settings" element={<Settings />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes></>
}
