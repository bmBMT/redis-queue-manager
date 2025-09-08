import { TRPCError } from "@trpc/server"
import { IGetAllConnectionsResponse } from "./interface/get-all-connections-response"
import slug from "speakingurl"
import { RedisAddConnectionDtoType } from "@redis-queue-manager/zod/schemas/dto/add-new-conneciton.dto"
import { prisma } from "@redis-queue-manager/prisma"
import { Errors } from "@redis-queue-manager/shared"
import RedisManager from "../../common/redis/redis-manager"
import ServerErrors from "../../common/errors"

class RedisService {
  public static async testConnection(config: RedisAddConnectionDtoType): Promise<boolean> {
    const isConnectable = await RedisManager.testConnection(config)

    if (!isConnectable)
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: Errors.REDIS_CONNECTION_FAILED,
      })

    return isConnectable
  }

  public static async checkNameIsFree(name: string): Promise<boolean> {
    const existConnection = await prisma.redisConnection.findFirst({
      where: { name: slug(name) },
    })

    if (existConnection)
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: Errors.REDIS_CONNECTION_NAME_ALREADY_EXISTS,
      })

    return true
  }

  public static async checkConnectionDataIsFree(host: string, port: number) {
    const existConnection = await prisma.redisConnection.findFirst({
      where: { host, port },
    })

    if (existConnection)
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: Errors.REDIS_CONNECTION_DATA_ALREADY_EXISTS,
      })

    return !existConnection
  }

  public static async addNewConnection(input: RedisAddConnectionDtoType) {
    await this.checkNameIsFree(input.name)
    await this.checkConnectionDataIsFree(input.host, input.port)

    await RedisManager.addConnection(input)
  }

  public static async getAllConnections(): Promise<IGetAllConnectionsResponse[]> {
    const registeredConnections = RedisManager.getAllInstances().values()
    const response: IGetAllConnectionsResponse[] = []

    for (const entity of registeredConnections) {
      response.push({
        name: entity.connection.name,
        displayName: entity.connection.displayName,
        status: entity.client.status,
        isConnected: entity.isConnected,
      })
    }

    return response
  }

  public static async getConnectionByName(name: string) {
    const redis = RedisManager.getInstance(name)

    if (!redis)
      throw new TRPCError({
        code: "NOT_FOUND",
        message: ServerErrors.REDIS_NOT_FOUND,
      })

    const queues = await redis.client.queueNames
    const caches = await redis.client.cacheNames

    return {
      name: redis.connection.name,
      isConnected: redis.isConnected,
      queues,
      caches,
    }
  }
}

export default RedisService
