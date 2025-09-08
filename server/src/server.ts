import { fastifyTRPCPlugin, FastifyTRPCPluginOptions } from "@trpc/server/adapters/fastify"
import Fastify from "fastify"
import fastifyCookie from "@fastify/cookie"
import fastifyCors from "@fastify/cors"
import { AppRouter, appRouter } from "./router"
import dotenv from "dotenv"
import { EnvironmentsConfig } from "@redis-queue-manager/shared"
import redisManagerPlugin from "./plugins/redis-manager.plugin"
import fastifyEnv from "@fastify/env"
import { fastifyEnvConfig } from "./config/fastify-env.config"
import { loggerInstance } from "./config/logger.config"
import { createUserContext } from './contexts/user.context'
import socketPlugin from './plugins/socket.plugin'
import { createInnerContext } from './contexts/inner.context'

dotenv.config({ path: [EnvironmentsConfig.server, EnvironmentsConfig.prisma] })

const fastify = Fastify({
  routerOptions: {
    maxParamLength: 5000,
  },
  loggerInstance: loggerInstance,
  disableRequestLogging: true,
})

const start = async () => {
  try {
    await fastify.register(fastifyEnv, fastifyEnvConfig)

    await fastify.register(fastifyCors, {
      credentials: true,
      origin: fastify.config.CLIENT_URL,
    })

    await fastify.register(fastifyCookie)
    await fastify.register(socketPlugin)
    await fastify.register(redisManagerPlugin)
    await fastify.register(fastifyTRPCPlugin, {
      prefix: "/",
      trpcOptions: {
        router: appRouter,
        createContext: createInnerContext,
      },
    })

    const port = fastify.config.PORT
    await fastify.listen({ port })
    fastify.log.info("Server is running on port " + port)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
