import { useQuery } from '@tanstack/react-query'

import { appointmentsKeys } from '../queryKeys'
import { getDoctorAppointments } from '../api'
import type { DoctorAppointmentsParams } from '../types'

export const useDoctorAppointments = (params: DoctorAppointmentsParams) => {
  return useQuery({
    queryKey: appointmentsKeys.doctorAppointments(params),
    queryFn: () => getDoctorAppointments(params),
    enabled: !!params,
  })
}
