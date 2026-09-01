import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

import { authenticate } from '../../middleware/authenticate'
import {
  appointmentIdParamsSchema,
  appointmentResponseSchema,
  createAppointmentBodySchema,
} from './appointment.schemas'
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

  fastify.patch(
    '/appointments/:id/cancel',
    {
      preHandler: authenticate,
      schema: {
        params: appointmentIdParamsSchema,
        response: { 200: appointmentResponseSchema },
      },
    },
    appointmentController.cancelAppointment,
  )
}
