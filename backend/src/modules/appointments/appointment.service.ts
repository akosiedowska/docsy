import { prisma } from '../../db/prisma'
import { ConflictError, NotFoundError } from '../../errors/http-error'

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
      select: {
        id: true,
        conducted: true,
        cancelled: true,
        slot: {
          select: {
            id: true,
            date: true,
            address: true,
            doctor: {
              select: { id: true, specialization: true, user: { select: { firstName: true, lastName: true } } },
            },
          },
        },
      },
    })
  })
}

export const appointmentService = {
  bookAppointment,
}
