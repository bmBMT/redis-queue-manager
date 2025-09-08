import fp from "fastify-plugin"
import { Server as SocketIOServer } from "socket.io"
import type { FastifyPluginAsync } from "fastify"
import { IOEvents } from '@redis-queue-manager/shared'

const socketPlugin: FastifyPluginAsync = fp(
  async (fastify) => {
    const io = new SocketIOServer<IOEvents>(fastify.server, {
      cors: { origin: fastify.config.CLIENT_URL },
    })

    fastify.decorate("io", io)

    io.on("connection", (socket) => {
      fastify.log.info(`Socket подключён: ${socket.id}`)
    })
  },
  {
    name: "fastify-socket.io",
  }
)

export default socketPlugin
