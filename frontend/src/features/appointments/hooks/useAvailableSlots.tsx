import { useQuery } from '@tanstack/react-query'

import { getAvailableSlots } from '../api'
import { appointmentsKeys } from '../queryKeys'

export const useAvailableSlots = (specialization?: string) => {
  return useQuery({
    queryKey: appointmentsKeys.availableSlots.bySpecialization(specialization),
    queryFn: () => getAvailableSlots(specialization),
    enabled: !!specialization,
  })
}
