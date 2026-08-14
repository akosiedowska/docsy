import { z } from 'zod'

export const createUserBodySchema = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.email(),
    password: z.string().min(8)
})

export type CreateUserBody = z.infer<typeof createUserBodySchema>

export const userResponseSchema = z.object({
    id: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.email(),
    createdAt: z.date()
})

export type UserResponse = z.infer<typeof userResponseSchema>
