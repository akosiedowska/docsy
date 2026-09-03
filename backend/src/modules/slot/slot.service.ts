import { prisma } from '../../db/prisma'
import { NotFoundError } from '../../errors/http-error'
import { UpdateSlotBody } from './slot.schema'

const getAvailableSlots = async ({ specialization }: { specialization?: string }) =>
  prisma.slot.findMany({
    where: { booked: false, doctor: specialization ? { specialization } : undefined },
    select: {
      id: true,
      date: true,
      address: true,
      booked: true,
      doctor: {
        select: {
          id: true,
          specialization: true,
          user: { select: { firstName: true, lastName: true } },
        },
      },
    },
    orderBy: { date: 'asc' },
  })

const updateSlotById = async (id: string, slotData: UpdateSlotBody) => {
  const slotInDb = await prisma.slot.findUnique({ where: { id } })
  if (!slotInDb) {
    throw new NotFoundError('Visit not found')
  }

  const result = await prisma.slot.update({
    where: { id },
    data: {
      booked: slotData.booked,
    },
    select: {
      id: true,
      date: true,
      address: true,
      booked: true,
      doctor: {
        select: {
          id: true,
          specialization: true,
          user: { select: { firstName: true, lastName: true } },
        },
      },
    },
  })
  return result
}

export const slotService = {
  getAvailableSlots,
  updateSlotById,
}
