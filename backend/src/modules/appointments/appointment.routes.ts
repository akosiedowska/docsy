import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

import { authenticate } from '../../middleware/authenticate'
import { appointmentResponseSchema, createAppointmentBodySchema } from './appointment.schemas'
import { appointmentController } from './appointment.controller'

export const appointmentRoutes: FastifyPluginAsyncZod = async (fastify) => {
  fastify.post(
    '/appointments',
    {
      preHandler: authenticate,
      schema: {
        body: createAppointmentBodySchema,
        response: { 201: appointmentResponseSchema },
      },
    },
    appointmentController.bookAppointment,
  )
}
