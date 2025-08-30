import Errors from "@common/errors";
import { TRPCError } from "@trpc/server";
import { RedisAddConnectionDtoType } from "./dto/add-new-conneciton.dto";
import prisma from "@server/lib/prisma";
import { RedisTestConnectionDtoType } from "./dto/test-connection.dto";
import RedisInstance from "./redis.instance";

class RedisService {
  public static async testConnection(config: RedisTestConnectionDtoType): Promise<boolean> {
    const instance = new RedisInstance({
      ...config,
      lazyConnect: true,
      maxRetriesPerRequest: 1,
    });

    try {
      await instance.connect();

      return true;
    } catch {
      instance.quit();

      throw new TRPCError({
        code: "BAD_REQUEST",
        message: Errors.REDIS_CONNECTION_FAILED,
      });
    }
    return true;
  }

  public static async checkNameIsFree(name: string): Promise<boolean> {
    const existConnection = await prisma.redisConnection.findFirst({
      where: { name },
    });

    if (existConnection)
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: Errors.REDIS_CONNECTION_NAME_ALREADY_EXISTS,
      });

    return true;
  }

  public static async checkConnectionDataIsFree(host: string, port: number) {
    const existConnection = await prisma.redisConnection.findFirst({
      where: { host, port },
    });

    if (existConnection)
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: Errors.REDIS_CONNECTION_DATA_ALREADY_EXISTS,
      });

    return existConnection;
  }

  public static async addNewConnection(input: RedisAddConnectionDtoType) {
    await this.checkNameIsFree(input.name);
    await this.checkConnectionDataIsFree(input.host, input.port);

    return await prisma.redisConnection.create({
      data: input,
    });
  }
}

export default RedisService;
