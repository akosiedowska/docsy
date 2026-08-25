import { apiClient } from '../../api/client'

export function getSpecializations() {
  return apiClient.get<string[]>('/specializations').then((r) => r.data)
}
