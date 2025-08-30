import { publicProcedure, router } from "../../trpc";
import { RedisAddConnectionDto } from "./dto/add-new-conneciton.dto";
import { RedisTestConnectionDto } from "./dto/test-connection.dto";
import RedisInstance from "./redis.instance";
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

    test: publicProcedure.query(() => {
      const redis = new RedisInstance({
        host: "127.0.0.1",
        port: 6379,
        db: 1,
      });

      return redis.getQueueNames();
    }),
  });
}

export default RedisRouter;
