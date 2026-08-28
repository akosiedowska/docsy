import { useQuery } from '@tanstack/react-query'

import { getAvailableSlots } from '../api'

export const useAvailableSlots = (specialization?: string) => {
  return useQuery({
    queryKey: ['availableSlots', specialization],
    queryFn: () => getAvailableSlots(specialization),
    enabled: !!specialization,
  })
}
