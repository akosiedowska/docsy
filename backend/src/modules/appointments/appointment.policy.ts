import { prisma } from '../../db/prisma'
import type { Appointment, Patient } from '../../../generated/prisma/client'
import type { AuthorizeOptions } from '../../middleware/authorize'
import type { CurrentUser } from '../../types/current-user'
import type { AppointmentIdParams } from './appointment.schemas'

type AppointmentWithPatient = Appointment & { patient: Patient }

const canCancel = (user: CurrentUser, appointment: AppointmentWithPatient) =>
  user.role === 'ADMIN' || appointment.patient.userId === user.id

export const cancelAppointmentPolicy: AuthorizeOptions<AppointmentWithPatient> = {
  load: (request) => {
    const { id } = request.params as AppointmentIdParams
    return prisma.appointment.findUnique({ where: { id }, include: { patient: true } })
  },
  check: canCancel,
  notFoundMessage: 'Appointment not found',
  forbiddenMessage: 'You can only cancel your own appointments',
}
