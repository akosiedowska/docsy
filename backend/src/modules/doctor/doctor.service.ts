import { prisma } from '../../db/prisma'

const getSpecializations = async () => {
  const result = await prisma.doctor.findMany({
    select: { specialization: true },
    distinct: ['specialization'],
  })
  return result.map((doctor) => doctor.specialization)
}

export const doctorService = {
  getSpecializations
}