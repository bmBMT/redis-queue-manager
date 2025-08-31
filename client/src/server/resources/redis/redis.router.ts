import { publicProcedure, router } from "../../trpc";
import { RedisAddConnectionDto } from "./dto/add-new-conneciton.dto";
import { RedisTestConnectionDto } from "./dto/test-connection.dto";
import RedisService from "./redis.service";

class RedisRouter {
  public static readonly router = router({
    testConnection: publicProcedure.input(RedisTestConnectionDto).mutation(({ input }) =>
      RedisService.testConnection({
        host: input.host,
        password: input.password,
        port: input.port,
      })
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
}

export default RedisRouter;
