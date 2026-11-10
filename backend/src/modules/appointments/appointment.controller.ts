import type { FastifyReply, FastifyRequest } from 'fastify'

import { appointmentService } from './appointment.service'
import type {
  AppointmentIdParams,
  AppointmentsQuery,
  CreateAppointmentBody,
  UpdateAppointmentBody,
} from './appointment.schemas'

const bookAppointment = async (
  request: FastifyRequest<{ Body: CreateAppointmentBody }>,
  reply: FastifyReply,
) => {
  const { sub: userId } = request.user as { sub: string }
  const result = await appointmentService.bookAppointment(request.body.slotId, userId)
  reply.code(201).send(result)
}

const cancelAppointment = async (
  request: FastifyRequest<{ Params: AppointmentIdParams }>,
  reply: FastifyReply,
) => {
  const result = await appointmentService.cancelAppointment(request.params.id)
  reply.code(200).send(result)
}

const getAppointments = async (
  request: FastifyRequest<{ Querystring: AppointmentsQuery }>,
  reply: FastifyReply,
) => {
  const result = await appointmentService.getAppointments(request.currentUser, request.query)
  reply.code(200).send(result)
}

const getAppointmentById = async (
  request: FastifyRequest<{ Params: AppointmentIdParams }>,
  reply: FastifyReply,
) => {
  const result = await appointmentService.getAppointmentById(request.params.id)
  reply.code(200).send(result)
}

const updateAppointmentById = async (
  request: FastifyRequest<{ Params: AppointmentIdParams; Body: UpdateAppointmentBody }>,
  reply: FastifyReply,
) => {
  const result = await appointmentService.updateAppointmentById(request.params.id, request.body)
  reply.code(200).send(result)
}

export const appointmentController = {
  bookAppointment,
  cancelAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointmentById,
}
