import { Stack } from '@mantine/core'

import { useDoctorAppointments } from '../../hooks/useDoctorAppointments'
import DoctorAppointmentSection from './DoctorAppointmentsSection'

const DoctorAppointmentList = () => {
  const upcoming = useDoctorAppointments({ conducted: false, sort: 'asc', limit: 8 })
  const conducted = useDoctorAppointments({ conducted: true, sort: 'desc', limit: 5 })

  return (
    <Stack gap='40px' align='center' w='100%' maw={500} mx='auto'>
      <DoctorAppointmentSection title='Upcoming visits' variant='upcoming' query={upcoming} />
      <DoctorAppointmentSection title='Recent visits' variant='recent' query={conducted} />
    </Stack>
  )
}

export default DoctorAppointmentList
