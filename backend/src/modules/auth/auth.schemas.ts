import { z } from 'zod'

import { userResponseSchema } from '../user/user.schemas'

export const loginBodySchema = z.object({
  email: z.email(),
  password: z.string().min(5),
})

export type LoginBody = z.infer<typeof loginBodySchema>

export const authResponseSchema = z.object({
  accessToken: z.string(),
  user: userResponseSchema,
})

export type AuthResponse = z.infer<typeof authResponseSchema>

export const refreshResponseSchema = z.object({
  accessToken: z.string(),
})

export type RefreshResponse = z.infer<typeof refreshResponseSchema>
