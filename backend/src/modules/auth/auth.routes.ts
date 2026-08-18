import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

import { authenticate } from '../../middleware/authenticate'
import { userResponseSchema } from '../user/user.schemas'
import { authController } from './auth.controller'
import { authResponseSchema, loginBodySchema } from './auth.schemas'

export const authRoutes: FastifyPluginAsyncZod = async (fastify) => {
  fastify.post(
    '/auth/login',
    {
      schema: {
        body: loginBodySchema,
        response: {
          200: authResponseSchema,
        },
      },
    },
    authController.login,
  )

  fastify.get(
    '/auth/me',
    {
      preHandler: authenticate,
      schema: {
        response: {
          200: userResponseSchema,
        },
      },
    },
    authController.me,
  )
}
