import { z } from 'zod'

export const createAppointmentBodySchema = z.object({
  slotId: z.uuid(),
})

export type CreateAppointmentBody = z.infer<typeof createAppointmentBodySchema>

export const appointmentResponseSchema = z.object({
  id: z.uuid(),
  conducted: z.boolean(),
  cancelled: z.boolean(),
  description: z.string().nullable(),
  slot: z.object({
    id: z.uuid(),
    date: z.date(),
    address: z.string(),
    doctor: z.object({
      id: z.uuid(),
      specialization: z.string(),
      user: z.object({
        firstName: z.string(),
        lastName: z.string(),
      }),
    }),
  }),
})

export const appointmentDetailResponseSchema = appointmentResponseSchema.extend({
  patient: z.object({
    id: z.uuid(),
    user: z.object({ firstName: z.string(), lastName: z.string() }),
  }),
})

export type AppointmentResponse = z.infer<typeof appointmentResponseSchema>

export const appointmentIdParamsSchema = z.object({ id: z.uuid() })

export type AppointmentIdParams = z.infer<typeof appointmentIdParamsSchema>

export const appointmentsResponseSchema = z.array(appointmentResponseSchema)

export type AppointmentsResponse = z.infer<typeof appointmentsResponseSchema>

export const doctorAppointmentsQuerySchema = z.object({
  conducted: z.stringbool().default(false),
  sort: z.enum(['asc', 'desc']).default('asc'),
  limit: z.coerce.number().int().positive().max(100).optional(),
})
export type DoctorAppointmentsQuery = z.infer<typeof doctorAppointmentsQuerySchema>

export const doctorAppointmentResponseSchema = z.object({
  id: z.uuid(),
  conducted: z.boolean(),
  cancelled: z.boolean(),
  slot: z.object({ id: z.uuid(), date: z.date(), address: z.string() }),
  patient: z.object({
    id: z.uuid(),
    user: z.object({ firstName: z.string(), lastName: z.string() }),
  }),
})
export const doctorAppointmentsResponseSchema = z.array(doctorAppointmentResponseSchema)

export const updateAppointmentBodySchema = z.object({
  description: z.string().nullable().optional(),
  conducted: z.boolean().optional(),
})

export type UpdateAppointmentBody = z.infer<typeof updateAppointmentBodySchema>
