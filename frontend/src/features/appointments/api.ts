import { apiClient } from '../../api/client'
import type { Appointment, AvailableSlot, CreateAppointmentBody } from './types'

export function getSpecializations() {
  return apiClient.get<string[]>('/specializations').then((r) => r.data)
}

export function getAvailableSlots(specialization?: string) {
  return apiClient.get<AvailableSlot[]>('/slots', { params: { specialization } }).then((r) => r.data)
}

export function bookSlot(id: string, payload: Pick<AvailableSlot, 'booked'>) {
  return apiClient.patch<AvailableSlot>(`/slots/${id}`, payload).then((r) => r.data)
}

export function bookAppointment(payload: CreateAppointmentBody) {
  return apiClient.post<Appointment>('/appointments', payload).then((r) => r.data)
}

export function getAppointments() {
  return apiClient.get<Appointment[]>('/appointments').then((r) => r.data)
}

export function cancelAppointment(id: string) {
  return apiClient.patch<Appointment>(`/appointments/${id}/cancel`).then((r) => r.data)
}
