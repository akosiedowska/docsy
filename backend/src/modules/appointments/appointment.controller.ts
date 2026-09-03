import type { FastifyReply, FastifyRequest } from 'fastify'

import { appointmentService } from './appointment.service'
import type { AppointmentIdParams, CreateAppointmentBody } from './appointment.schemas'

const bookAppointment = async (request: FastifyRequest<{ Body: CreateAppointmentBody }>, reply: FastifyReply) => {
  const { sub: userId } = request.user as { sub: string }
  const result = await appointmentService.bookAppointment(request.body.slotId, userId)
  reply.code(201).send(result)
}

const cancelAppointment = async (request: FastifyRequest<{ Params: AppointmentIdParams }>, reply: FastifyReply) => {
  const { sub: userId } = request.user as { sub: string }
  const result = await appointmentService.cancelAppointment(request.params.id, userId)
  reply.code(200).send(result)
}

const getAppointments = async (request: FastifyRequest, reply: FastifyReply) => {
  const { sub: userId } = request.user as { sub: string }
  const result = await appointmentService.getAppointmentsByUserId(userId)
  reply.code(200).send(result)
}

export const appointmentController = {
  bookAppointment,
  cancelAppointment,
  getAppointments,
}
