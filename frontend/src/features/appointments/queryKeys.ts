import type { DoctorAppointmentsParams } from './types'

export const appointmentsKeys = {
  availableSlots: {
    all: ['availableSlots'] as const,
    bySpecialization: (specialization?: string) => ['availableSlots', specialization] as const,
  },
  specializations: ['specializations'] as const,
  appointments: ['appointments'] as const,
  appointment: (id: string) => ['appointment', id] as const,
  doctorAppointments: (params: DoctorAppointmentsParams) =>
    ['appointments', 'doctor', params] as const,
}
