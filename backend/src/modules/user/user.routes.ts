import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { userController } from './user.controller'
import {
  allUsersResponseSchema,
  createUserBodySchema,
  updateUserBodySchema,
  userIdParamsSchema,
  userResponseSchema,
} from './user.schemas'
import { authenticate } from '../../middleware/authenticate'

export const userRoutes: FastifyPluginAsyncZod = async (fastify) => {
  fastify.post(
    '/users',
    {
      schema: {
        body: createUserBodySchema,
        response: {
          201: userResponseSchema,
        },
      },
    },
    userController.createUser,
  )

  fastify.get(
    '/users',
    {
      schema: {
        response: {
          200: allUsersResponseSchema,
        },
      },
    },
    userController.getAllUsers,
  )

  fastify.get(
    '/users/:id',
    {
      preHandler: authenticate,
      schema: {
        params: userIdParamsSchema,
        response: {
          200: userResponseSchema,
        },
      },
    },
    userController.getUserById,
  )

  fastify.patch(
    '/users/:id',
    {
      preHandler: authenticate,
      schema: {
        params: userIdParamsSchema,
        body: updateUserBodySchema,
        response: {
          200: userResponseSchema,
        },
      },
    },
    userController.updateUserById,
  )

  fastify.delete(
    '/users/:id',
    {
      preHandler: authenticate,
      schema: {
        params: userIdParamsSchema,
        response: {
          204: z.null(),
        },
      },
    },
    userController.deleteUserById,
  )
}
