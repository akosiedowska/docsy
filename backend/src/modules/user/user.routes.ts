import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { userController } from "./user.controller"
import { createUserBodySchema, userResponseSchema } from "./user.schemas"

export const userRoutes: FastifyPluginAsyncZod = async (fastify) => {
    fastify.post('/users', {
        schema: {
            body: createUserBodySchema,
            response: {
                201: userResponseSchema
            }
        }
    }, userController.createUser)
}
