import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { userRoutes } from "../modules/user/user.routes"

export const routes: FastifyPluginAsyncZod = async (fastify) => {
    fastify.register(userRoutes)
}
