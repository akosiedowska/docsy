import { useQuery } from '@tanstack/react-query'

import { appointmentsKeys } from '../queryKeys'
import { getAppointmentById } from '../api'

export const useAppointment = (id: string) => {
  return useQuery({
    queryKey: appointmentsKeys.appointment(id),
    queryFn: () => getAppointmentById(id),
    enabled: !!id,
  })
}
