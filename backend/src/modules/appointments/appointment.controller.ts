import type { FastifyReply, FastifyRequest } from 'fastify'

import { appointmentService } from './appointment.service'
import type { CreateAppointmentBody } from './appointment.schemas'

const bookAppointment = async (request: FastifyRequest<{ Body: CreateAppointmentBody }>, reply: FastifyReply) => {
  const { sub: userId } = request.user as { sub: string }
  const result = await appointmentService.bookAppointment(request.body.slotId, userId)
  reply.code(201).send(result)
}

export const appointmentController = { bookAppointment }
