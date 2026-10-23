import { Stack } from '@mantine/core'
import DashboardGreeting from '../../features/appointments/components/patient/DashboardGreeting'
import AppointmentList from '../../features/appointments/components/patient/AppointmentList'

const DashboardPage = () => {
  return (
    <Stack gap='36'>
      <DashboardGreeting />
      <AppointmentList />
    </Stack>
  )
}

export default DashboardPage
