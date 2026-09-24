import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { slotController } from './slot.controller'
import {
  slotIdParamsSchema,
  slotResponseSchema,
  slotsQuerySchema,
  slotsResponseSchema,
  updateSlotBodySchema,
} from './slot.schema'
import { authenticate } from '../../middleware/authenticate'
import { requireRole } from '../../middleware/requireRole'

export const slotRoutes: FastifyPluginAsyncZod = async (fastify) => {
  fastify.addHook('preHandler', authenticate)

  fastify.get(
    '/slots',
    {
      schema: {
        querystring: slotsQuerySchema,
        response: { 200: slotsResponseSchema },
      },
    },
    slotController.getAvailableSlots,
  )
  fastify.patch(
    '/slots/:id',
    {
      preHandler: requireRole('ADMIN'),
      schema: {
        params: slotIdParamsSchema,
        body: updateSlotBodySchema,
        response: {
          200: slotResponseSchema,
        },
      },
    },
    slotController.updateSlotById,
  )
}
