import Errors from "@common/errors";
import { TRPCError } from "@trpc/server";
import { RedisAddConnectionDtoType } from "./dto/add-new-conneciton.dto";
import prisma from "@server/lib/prisma";
import { RedisTestConnectionDtoType } from "./dto/test-connection.dto";
import RedisInstance from "../../common/redis/redis.instance";
import { redisRegistry } from "@server/common/redis/redis-registry";
import { IGetAllConnectionsResponse } from "./interface/get-all-connections-response";
import slug from "speakingurl";

class RedisService {
  public static async testConnection(config: RedisTestConnectionDtoType): Promise<boolean> {
    const instance = new RedisInstance("test-connection", {
      ...config,
      lazyConnect: true,
      maxRetriesPerRequest: 1,
    });

    try {
      await instance.instance.connect();

      return true;
    } catch {
      instance.instance.quit();

      throw new TRPCError({
        code: "BAD_REQUEST",
        message: Errors.REDIS_CONNECTION_FAILED,
      });
    }
  }

  public static async checkNameIsFree(name: string): Promise<boolean> {
    const existConnection = await prisma.redisConnection.findFirst({
      where: { name: slug(name) },
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
      data: {
        ...input,
        displayName: input.name,
        name: slug(input.name),
      },
    });
  }

  public static async getAllConnections(): Promise<IGetAllConnectionsResponse[]> {
    const dbConnections = await prisma.redisConnection.findMany();
    const registeredConnections = await redisRegistry.list();
    const response: IGetAllConnectionsResponse[] = [];

    for (const connection of dbConnections) {
      const isConnectionRegistered = registeredConnections.includes(connection.name);
      const redis = isConnectionRegistered ? await redisRegistry.get(connection.name) : null;

      response.push({
        id: connection.id,
        name: connection.name,
        displayName: connection.displayName,
        status: isConnectionRegistered ? redis!.instance.status : "close",
        registered: isConnectionRegistered,
      });
    }

    return response;
  }

  public static async getConnectionByName(name: string) {
    const redis = await redisRegistry.get(name);

    return await redis?.getInfo();
  }
}

export default RedisService;
