import { Stack } from '@mantine/core'
import AppointmentList from '../../features/appointments/components/patient/AppointmentList'
import DashboardGreeting from '../../features/appointments/components/patient/DashboardGreeting'

const DashboardPage = () => {
  return (
    <Stack gap='36'>
      <DashboardGreeting />
      <AppointmentList />
    </Stack>
  )
}

export default DashboardPage
