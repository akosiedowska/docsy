import { apiClient } from '../../api/client'
import type {
  Appointment,
  AppointmentDetail,
  AppointmentsPage,
  AvailableSlot,
  CreateAppointmentBody,
  DoctorAppointmentsParams,
  UpdateAppointmentBody,
} from './types'

export const getSpecializations = () => {
  return apiClient.get<string[]>('/specializations').then((r) => r.data)
}

export const getAvailableSlots = (specialization?: string) => {
  return apiClient
    .get<AvailableSlot[]>('/slots', { params: { specialization } })
    .then((r) => r.data)
}

export const bookSlot = (id: string, payload: Pick<AvailableSlot, 'booked'>) => {
  return apiClient.patch<AvailableSlot>(`/slots/${id}`, payload).then((r) => r.data)
}

export const bookAppointment = (payload: CreateAppointmentBody) => {
  return apiClient.post<Appointment>('/appointments', payload).then((r) => r.data)
}

export const getAppointments = () => {
  return apiClient
    .get<AppointmentsPage>('/appointments', { params: { limit: 100 } })
    .then((r) => r.data.items)
}

export const cancelAppointment = (id: string) => {
  return apiClient.patch<Appointment>(`/appointments/${id}/cancel`).then((r) => r.data)
}

export const getDoctorAppointments = (params: DoctorAppointmentsParams) =>
  apiClient.get<AppointmentsPage>('/appointments', { params }).then((r) => r.data.items)

export const getAppointmentById = (id: string) =>
  apiClient.get<AppointmentDetail>(`/appointments/${id}`).then((r) => r.data)

export const updateAppointmentById = (id: string, payload: UpdateAppointmentBody) => {
  return apiClient.patch<AppointmentDetail>(`/appointments/${id}`, payload).then((r) => r.data)
}
