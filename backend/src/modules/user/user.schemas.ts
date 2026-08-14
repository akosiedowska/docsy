import { z } from 'zod'

export const createUserBodySchema = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.email(),
    password: z.string().min(8)
})

export type CreateUserBody = z.infer<typeof createUserBodySchema>

export const updateUserBodySchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.email(),
  password: z.string().min(8),
}).partial()

export type UpdateUserBody = z.infer<typeof updateUserBodySchema>

export const userResponseSchema = z.object({
  id: z.uuid(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.email(),
  createdAt: z.date(),
})

export type UserResponse = z.infer<typeof userResponseSchema>

export const userIdParamsSchema = z.object({ id: z.uuid() })

export type UserIdParams = z.infer<typeof userIdParamsSchema>

export const allUsersResponseSchema = z.array(userResponseSchema)

export type AllUsersResponse = z.infer<typeof allUsersResponseSchema>
