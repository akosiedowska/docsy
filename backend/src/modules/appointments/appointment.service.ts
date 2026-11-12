import { prisma } from '../../db/prisma'
import { Role } from '../../../generated/prisma/enums'
import { ConflictError, NotFoundError } from '../../errors/http-error'
import type { CurrentUser } from '../../types/current-user'
import type { AppointmentsQuery, UpdateAppointmentBody } from './appointment.schemas'

import type { Prisma } from '../../../generated/prisma/client'

const appointmentDetailSelect = {
  id: true,
  conducted: true,
  cancelled: true,
  description: true,
  recommendations: true,
  slot: {
    select: {
      id: true,
      date: true,
      address: true,
      doctor: {
        select: {
          id: true,
          specialization: true,
          user: { select: { firstName: true, lastName: true } },
        },
      },
    },
  },
  patient: {
    select: { id: true, user: { select: { firstName: true, lastName: true } } },
  },
} satisfies Prisma.AppointmentSelect

const bookAppointment = async (slotId: string, userId: string) => {
  return prisma.$transaction(async (tx) => {
    const patient = await tx.patient.findUnique({ where: { userId } })
    if (!patient) throw new NotFoundError('Patient not found')

    const slot = await tx.slot.findUnique({ where: { id: slotId } })
    if (!slot) throw new NotFoundError('Slot not found')
    if (slot.booked) throw new ConflictError('Slot already booked')

    await tx.slot.update({ where: { id: slotId }, data: { booked: true } })

    return tx.appointment.create({
      data: { slotId, patientId: patient.id },
      select: appointmentDetailSelect,
    })
  })
}

const cancelAppointment = async (id: string) => {
  return prisma.$transaction(async (tx) => {
    const appointment = await tx.appointment.findUnique({
      where: { id },
      include: { patient: true, slot: true },
    })

    if (!appointment) throw new NotFoundError('Appointment not found')
    if (appointment.cancelled) throw new ConflictError('Appointment already cancelled')
    if (appointment.conducted) throw new ConflictError('Appointment already conducted')

    await tx.slot.update({
      where: { id: appointment.slotId },
      data: { booked: false },
    })
    return tx.appointment.update({
      where: { id },
      data: { cancelled: true },
      select: appointmentDetailSelect,
    })
  })
}

const buildScopeFilter = ({ id, role }: CurrentUser): Prisma.AppointmentWhereInput => {
  switch (role) {
    case Role.PATIENT:
      return { patient: { userId: id } }
    case Role.DOCTOR:
      return { slot: { doctor: { userId: id } } }
    case Role.ADMIN:
      return {}
  }
}

// Only admins may see cancelled appointments
const buildStatusFilter = (
  role: Role,
  { conducted, cancelled }: Pick<AppointmentsQuery, 'conducted' | 'cancelled'>,
): Prisma.AppointmentWhereInput => ({
  conducted,
  cancelled: role === Role.ADMIN ? cancelled : false,
})

const nameFilter = (word: string): Prisma.UserWhereInput => ({
  OR: [
    { firstName: { contains: word, mode: 'insensitive' } },
    { lastName: { contains: word, mode: 'insensitive' } },
  ],
})

const buildSearchFilter = (role: Role, search?: string): Prisma.AppointmentWhereInput => {
  if (!search || role === Role.PATIENT) return {}

  const words = search.split(/\s+/)
  const matchesPatient = (word: string): Prisma.AppointmentWhereInput => ({
    patient: { user: nameFilter(word) },
  })
  const matchesDoctor = (word: string): Prisma.AppointmentWhereInput => ({
    slot: { doctor: { user: nameFilter(word) } },
  })

  return {
    AND: words.map((word) =>
      role === Role.DOCTOR
        ? matchesPatient(word)
        : { OR: [matchesPatient(word), matchesDoctor(word)] },
    ),
  }
}

const orderByMap = {
  date: (order) => [{ slot: { date: order } }],
  patientFirstName: (order) => [
    { patient: { user: { firstName: order } } },
    { patient: { user: { lastName: order } } },
    { slot: { date: 'asc' } },
  ],
  patientLastName: (order) => [
    { patient: { user: { lastName: order } } },
    { patient: { user: { firstName: order } } },
    { slot: { date: 'asc' } },
  ],
} satisfies Record<
  AppointmentsQuery['sortBy'],
  (order: Prisma.SortOrder) => Prisma.AppointmentOrderByWithRelationInput[]
>

const getAppointments = async (
  user: CurrentUser,
  { conducted, cancelled, search, sortBy, sortOrder, limit, offset }: AppointmentsQuery,
) => {
  const where: Prisma.AppointmentWhereInput = {
    AND: [
      buildScopeFilter(user),
      buildStatusFilter(user.role, { conducted, cancelled }),
      buildSearchFilter(user.role, search),
    ],
  }

  const [items, total] = await prisma.$transaction([
    prisma.appointment.findMany({
      where,
      orderBy: [...orderByMap[sortBy](sortOrder), { id: 'asc' }],
      take: limit,
      skip: offset,
      select: appointmentDetailSelect,
    }),
    prisma.appointment.count({ where }),
  ])

  return { items, total }
}

export const getAppointmentById = async (id: string) => {
  const appointment = await prisma.appointment.findUnique({
    where: { id },
    select: appointmentDetailSelect,
  })
  if (!appointment) throw new NotFoundError('Appointment not found')

  return appointment
}

const updateAppointmentById = async (id: string, appointmentData: UpdateAppointmentBody) => {
  const appointment = await prisma.appointment.findUnique({ where: { id } })
  if (!appointment) {
    throw new NotFoundError('Appointment not found')
  }
  if (appointment.cancelled) throw new ConflictError('Appointment is cancelled')

  return await prisma.appointment.update({
    where: { id },
    data: {
      conducted: appointmentData.conducted,
      description: appointmentData.description,
      recommendations: appointmentData.recommendations,
    },
    select: appointmentDetailSelect,
  })
}

export const appointmentService = {
  bookAppointment,
  cancelAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointmentById,
}
