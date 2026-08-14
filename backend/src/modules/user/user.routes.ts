import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { z } from 'zod'
import { userController } from "./user.controller"
import { allUsersResponseSchema, createUserBodySchema, userIdParamsSchema, userResponseSchema } from './user.schemas'

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
        schema: {
          params: userIdParamsSchema,
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
        schema: {
          params: userIdParamsSchema,
          response: {
            204: z.null(),
          },
        }
      },
      userController.deleteUserById
    )
}
