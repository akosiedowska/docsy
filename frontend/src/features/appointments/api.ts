import { apiClient } from '../../api/client'
import type { AvailableSlot } from './types'

export function getSpecializations() {
  return apiClient.get<string[]>('/specializations').then((r) => r.data)
}

export function getAvailableSlots(specialization?: string) {
  return apiClient.get<AvailableSlot[]>('/slots', { params: { specialization } }).then((r) => r.data)
}

export function bookSlot(id: string, payload: Pick<AvailableSlot, 'booked'>) {
  return apiClient.patch<AvailableSlot>(`/slots/${id}`, payload).then((r) => r.data)
}
