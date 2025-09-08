import { IOEvents } from '@redis-queue-manager/shared';
import "fastify";
import { Server as SocketIOServer } from "socket.io";

declare module "fastify" {
  interface FastifyInstance {
    io: SocketIOServer<IOEvents>;
  }
}
