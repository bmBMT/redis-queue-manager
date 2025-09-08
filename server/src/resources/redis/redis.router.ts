import { RedisAddConnectionDto } from "@redis-queue-manager/zod"
import { procedure, router } from "../../config/trpc.config"
import RedisService from "./redis.service"

const redisRouter = router({
  testConnection: procedure.input(RedisAddConnectionDto).mutation(({ input }) => RedisService.testConnection(input)),

  checkNameIsFree: procedure
    .input(RedisAddConnectionDto.pick({ name: true }))
    .query(({ input }) => RedisService.checkNameIsFree(input.name)),

  checkConnectionDataIsFree: procedure
    .input(RedisAddConnectionDto.pick({ host: true, port: true }))
    .query(({ input }) => RedisService.checkConnectionDataIsFree(input.host, input.port)),

  addNewConnection: procedure
    .input(RedisAddConnectionDto)
    .mutation(({ input }) => RedisService.addNewConnection(input)),

  getAllConnections: procedure.query(() => RedisService.getAllConnections()),

  getConnectionByName: procedure
    .input(RedisAddConnectionDto.pick({ name: true }))
    .query(({ input }) => RedisService.getConnectionByName(input.name)),
})

export default redisRouter
