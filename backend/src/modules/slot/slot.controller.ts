import type { FastifyReply, FastifyRequest } from 'fastify'
import { slotService } from './slot.service'
import type { SlotsQuery } from './slot.schema'

const getAvailableSlots = async (request: FastifyRequest<{ Querystring: SlotsQuery }>, reply: FastifyReply) => {
  const result = await slotService.getAvailableSlots(request.query)
  reply.code(200).send(result)
}

export const slotController = {
  getAvailableSlots,
}
