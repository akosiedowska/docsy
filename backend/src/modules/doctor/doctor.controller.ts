import { FastifyReply, FastifyRequest } from 'fastify'
import { doctorService } from './doctor.service'

const getSpecializations = async (request: FastifyRequest, reply: FastifyReply) => {
  const result = await doctorService.getSpecializations()
  reply.code(200).send(result)
}

export const doctorController = {
  getSpecializations,
}
