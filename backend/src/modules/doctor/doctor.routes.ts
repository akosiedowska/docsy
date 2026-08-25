import fastify, { FastifyPluginAsync } from 'fastify'
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { doctorController } from './doctor.controller'
import { specializationsResponseSchema } from './doctor.schemas'

export const doctorRoutes: FastifyPluginAsyncZod = async (fastify) => {
  fastify.get(
    '/specializations',
    {
      schema: {
        response: {
          200: specializationsResponseSchema,
        },
      },
    },
    doctorController.getSpecializations,
  )
}
