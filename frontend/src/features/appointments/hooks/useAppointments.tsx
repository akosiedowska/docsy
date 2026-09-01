import { useQuery } from '@tanstack/react-query'
import { appointmentsKeys } from '../queryKeys'
import { getAppointments } from '../api'

export function useAppointments() {
  return useQuery({
    queryKey: appointmentsKeys.appointments,
    queryFn: getAppointments,
  })
}
