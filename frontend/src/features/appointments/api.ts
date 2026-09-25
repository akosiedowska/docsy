import { apiClient } from '../../api/client'
import type { Appointment, AvailableSlot, CreateAppointmentBody } from './types'

export const getSpecializations = () => {
  return apiClient.get<string[]>('/specializations').then((r) => r.data)
}

export const getAvailableSlots = (specialization?: string) => {
  return apiClient.get<AvailableSlot[]>('/slots', { params: { specialization } }).then((r) => r.data)
}

export const bookSlot = (id: string, payload: Pick<AvailableSlot, 'booked'>) => {
  return apiClient.patch<AvailableSlot>(`/slots/${id}`, payload).then((r) => r.data)
}

export const bookAppointment = (payload: CreateAppointmentBody) => {
  return apiClient.post<Appointment>('/appointments', payload).then((r) => r.data)
}

export const getAppointments = () => {
  return apiClient.get<Appointment[]>('/appointments').then((r) => r.data)
}

export const cancelAppointment = (id: string) => {
  return apiClient.patch<Appointment>(`/appointments/${id}/cancel`).then((r) => r.data)
}
