import { useQuery } from '@tanstack/react-query'

import { getSpecializations } from '../api'
import { appointmentsKeys } from '../queryKeys'

export function useSpecializations() {
  return useQuery({
    queryKey: appointmentsKeys.specializations,
    queryFn: getSpecializations,
  })
}
