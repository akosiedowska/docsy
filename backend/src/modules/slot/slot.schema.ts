import { z } from 'zod'

export const slotsQuerySchema = z.object({
  specialization: z.string().min(1).optional(),
})

export type SlotsQuery = z.infer<typeof slotsQuerySchema>

export const slotResponseSchema = z.object({
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
})

export type SlotResponse = z.infer<typeof slotResponseSchema>

export const slotsResponseSchema = z.array(slotResponseSchema)

export type SlotsResponse = z.infer<typeof slotsResponseSchema>
