import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

import { authenticate } from '../../middleware/authenticate'
import { authorize } from '../../middleware/authorize'
import {
  appointmentIdParamsSchema,
  appointmentResponseSchema,
  appointmentsResponseSchema,
  createAppointmentBodySchema,
  doctorAppointmentsQuerySchema,
  doctorAppointmentsResponseSchema,
} from './appointment.schemas'
import { appointmentController } from './appointment.controller'
import { cancelAppointmentPolicy } from './appointment.policy'

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
      preHandler: [authenticate, authorize(cancelAppointmentPolicy)],
      schema: {
        params: appointmentIdParamsSchema,
        response: { 200: appointmentResponseSchema },
      },
    },
    appointmentController.cancelAppointment,
  )

  fastify.get(
    '/appointments',
    {
      preHandler: authenticate,
      schema: {
        response: { 200: appointmentsResponseSchema },
      },
    },
    appointmentController.getPatientAppointments,
  )

  fastify.get(
    '/appointments/doctor',
    {
      preHandler: authenticate,
      schema: {
        querystring: doctorAppointmentsQuerySchema,
        response: { 200: doctorAppointmentsResponseSchema },
      },
    },
    appointmentController.getDoctorAppointments,
  )
}
