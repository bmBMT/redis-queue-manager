import { RedisAddConnectionDto } from '@redis-queue-manager/zod';
import { publicProcedure, router } from '../../trpc';
import RedisService from "./redis.service";

const redisRouter = router({
  testConnection: publicProcedure.input(RedisAddConnectionDto).mutation(({ input }) =>
    RedisService.testConnection(input)
  ),

  checkNameIsFree: publicProcedure
    .input(RedisAddConnectionDto.pick({ name: true }))
    .query(({ input }) => RedisService.checkNameIsFree(input.name)),

  checkConnectionDataIsFree: publicProcedure
    .input(RedisAddConnectionDto.pick({ host: true, port: true }))
    .query(({ input }) => RedisService.checkConnectionDataIsFree(input.host, input.port)),

  addNewConnection: publicProcedure
    .input(RedisAddConnectionDto)
    .mutation(({ input }) => RedisService.addNewConnection(input)),

  getAllConnections: publicProcedure.query(() => RedisService.getAllConnections()),

  getConnectionByName: publicProcedure
    .input(RedisAddConnectionDto.pick({ name: true }))
    .query(({ input }) => RedisService.getConnectionByName(input.name)),
});

export default redisRouter;
