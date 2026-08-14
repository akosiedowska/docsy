import { z } from 'zod'

export const createUserBodySchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
})
export type CreateUserBody = z.infer<typeof createUserBodySchema>