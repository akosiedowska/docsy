import type { FastifyReply, FastifyRequest } from 'fastify'
import { slotService } from './slot.service'
import type { SlotIdParams, SlotsQuery, UpdateSlotBody } from './slot.schema'

const getAvailableSlots = async (request: FastifyRequest<{ Querystring: SlotsQuery }>, reply: FastifyReply) => {
  const result = await slotService.getAvailableSlots(request.query)
  reply.code(200).send(result)
}

const updateSlotById = async (
  request: FastifyRequest<{ Params: SlotIdParams; Body: UpdateSlotBody }>,
  reply: FastifyReply,
) => {
  const result = await slotService.updateSlotById(request.params.id, request.body)
  reply.code(200).send(result)
}

export const slotController = {
  getAvailableSlots,
  updateSlotById,
}
