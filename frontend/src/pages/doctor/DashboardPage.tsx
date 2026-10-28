import { Stack } from '@mantine/core'
import DashboardGreeting from '../../features/dashboard/components/DashboardGreeting'
import DoctorAppointmentList from '../../features/appointments/components/doctor/DoctorAppointmentList'

const DashboardPage = () => {
  return (
    <Stack gap='36'>
      <DashboardGreeting />
      <DoctorAppointmentList />
    </Stack>
  )
}

export default DashboardPage
