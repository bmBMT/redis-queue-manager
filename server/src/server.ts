import { fastifyTRPCPlugin, FastifyTRPCPluginOptions } from "@trpc/server/adapters/fastify"
import Fastify from "fastify"
import fastifyCookie from "@fastify/cookie"
import fastifyCors from "@fastify/cors"
import { AppRouter, appRouter } from "./router"
import dotenv from "dotenv"
import { EnvironmentsConfig } from "@redis-queue-manager/shared"

dotenv.config({ path: [EnvironmentsConfig.server, EnvironmentsConfig.prisma] })

const fastify = Fastify({
  maxParamLength: 5000,
  // logger: true,
})

const start = async () => {
  try {
    await fastify.register(fastifyCors, {
      credentials: true,
      origin: process.env.CLIENT_URL,
    })

    await fastify.register(fastifyCookie)

    await fastify.register(fastifyTRPCPlugin, {
      prefix: "/",
      trpcOptions: {
        router: appRouter,
      } as FastifyTRPCPluginOptions<AppRouter>["trpcOptions"],
    })

    const port = Number(process.env.PORT) || 2022
    await fastify.listen({ port })
    console.log("Server is running on port " + port)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
