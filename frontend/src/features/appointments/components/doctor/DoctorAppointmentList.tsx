import { useEffect } from 'react'
import { useDoctorAppointments } from '../../hooks/useDoctorAppointments'

const DoctorAppointmentList = () => {
  const {
    isPending,
    isError,
    data: appointments,
    error,
  } = useDoctorAppointments({ conducted: false, sort: 'asc' })

  useEffect(() => {
    console.log('doc appoint', appointments)
  }, [appointments])

  return <div>DoctorAppointmentList</div>
}

export default DoctorAppointmentList
