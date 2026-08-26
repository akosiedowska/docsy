import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { slotController } from './slot.controller'
import { slotsQuerySchema, slotsResponseSchema } from './slot.schema'

export const slotRoutes: FastifyPluginAsyncZod = async (fastify) => {
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
}
