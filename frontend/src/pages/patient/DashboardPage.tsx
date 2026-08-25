import { Stack, Typography } from '@mui/material'
import { Appointment } from '../../features/appointments/components/patient/Appointment'

const DashboardPage = () => {
  return (
    <Stack spacing={5} sx={{ alignItems: 'center' }}>
      <Stack spacing={2}>
        <Typography>Next appointments</Typography>
        <Appointment />
      </Stack>
      <Stack spacing={2}>
        <Typography>Previous appointments</Typography>
        <Appointment />
      </Stack>
    </Stack>
  )
}

export default DashboardPage
