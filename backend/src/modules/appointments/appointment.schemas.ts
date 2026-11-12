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
  recommendations: z.string().nullable(),
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

// z.coerce.boolean() would turn the string 'false' into true
const booleanQuerySchema = z.enum(['true', 'false']).transform((value) => value === 'true')

export const appointmentsQuerySchema = z.object({
  conducted: booleanQuerySchema.optional(),
  cancelled: booleanQuerySchema.optional(),
  search: z.string().trim().min(1).max(100).optional(),
  sortBy: z.enum(['date', 'patientFirstName', 'patientLastName']).default('date'),
  sortOrder: z.enum(['asc', 'desc']).default('asc'),
  limit: z.coerce.number().int().positive().max(100).default(20),
  offset: z.coerce.number().int().min(0).default(0),
})
export type AppointmentsQuery = z.infer<typeof appointmentsQuerySchema>

export const appointmentsResponseSchema = z.object({
  items: z.array(appointmentDetailResponseSchema),
  total: z.number().int().nonnegative(),
})

export const updateAppointmentBodySchema = z.object({
  description: z.string().nullable().optional(),
  conducted: z.boolean().optional(),
  recommendations: z.string().nullable().optional(),
})

export type UpdateAppointmentBody = z.infer<typeof updateAppointmentBodySchema>
