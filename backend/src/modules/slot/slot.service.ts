import { prisma } from '../../db/prisma'

const getAvailableSlots = async ({ specialization }: { specialization?: string }) =>
  prisma.slot.findMany({
    where: { booked: false, doctor: specialization ? { specialization } : undefined },
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
    orderBy: { date: 'asc' },
  })

export const slotService = {
  getAvailableSlots,
}
