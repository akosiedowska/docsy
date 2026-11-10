import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

import { authenticate } from '../../middleware/authenticate'
import { authorize } from '../../middleware/authorize'
import {
  appointmentDetailResponseSchema,
  appointmentIdParamsSchema,
  appointmentResponseSchema,
  appointmentsQuerySchema,
  appointmentsResponseSchema,
  createAppointmentBodySchema,
  updateAppointmentBodySchema,
} from './appointment.schemas'
import { appointmentController } from './appointment.controller'
import {
  cancelAppointmentPolicy,
  updateAppointmentPolicy,
  viewAppointmentPolicy,
} from './appointment.policy'
import { requireRole } from '../../middleware/requireRole'
import { Role } from '../../../generated/prisma/enums'

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
        querystring: appointmentsQuerySchema,
        response: { 200: appointmentsResponseSchema },
      },
    },
    appointmentController.getAppointments,
  )

  fastify.get(
    '/appointments/:id',
    {
      preHandler: [authenticate, authorize(viewAppointmentPolicy)],
      schema: {
        params: appointmentIdParamsSchema,
        response: { 200: appointmentDetailResponseSchema },
      },
    },
    appointmentController.getAppointmentById,
  )

  fastify.patch(
    '/appointments/:id',
    {
      preHandler: [
        authenticate,
        requireRole(Role.DOCTOR, Role.ADMIN),
        authorize(updateAppointmentPolicy),
      ],
      schema: {
        params: appointmentIdParamsSchema,
        body: updateAppointmentBodySchema,
        response: { 200: appointmentDetailResponseSchema },
      },
    },
    appointmentController.updateAppointmentById,
  )
}
