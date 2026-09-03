import { z } from 'zod'

export const createAppointmentBodySchema = z.object({
  slotId: z.uuid(),
})

export type CreateAppointmentBody = z.infer<typeof createAppointmentBodySchema>

export const appointmentResponseSchema = z.object({
  id: z.uuid(),
  conducted: z.boolean(),
  cancelled: z.boolean(),
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

export type AppointmentResponse = z.infer<typeof appointmentResponseSchema>

export const appointmentIdParamsSchema = z.object({ id: z.uuid() })

export type AppointmentIdParams = z.infer<typeof appointmentIdParamsSchema>

export const appointmentsResponseSchema = z.array(appointmentResponseSchema)

export type AppointmentsResponse = z.infer<typeof appointmentsResponseSchema>
