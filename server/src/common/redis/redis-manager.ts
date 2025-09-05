import { ONE_SECOND } from "@redis-queue-manager/shared"
import { prisma } from "@redis-queue-manager/prisma"
import { FastifyInstance } from "fastify"
import RedisEntity from "./redis.entity"
import { RedisAddConnectionDtoType } from "@redis-queue-manager/zod"
import slug from "speakingurl"
import { RedisInstance } from '../../types/redis.type'

class RedisManager {
  private static instances: Map<string, RedisInstance> = new Map()
  private static fastify: FastifyInstance | null = null

  public static initialize(fastifyInstance: FastifyInstance): void {
    this.fastify = fastifyInstance
    this.fastify.log.info("RedisManager initialized")
  }

 static getFastify(): FastifyInstance {
    if (!this.fastify) {
      throw new Error("RedisManager not initialized. Call RedisManager.initialize() first.")
    }
    return this.fastify
  }

  private static createRedisClient(connection: RedisAddConnectionDtoType): RedisEntity {
    return new RedisEntity({
      host: connection.host,
      port: connection.port,
      password: connection.password || undefined,
      db: connection.db,
      retryStrategy: () => 5 * ONE_SECOND,
    })
  }

  public static async initializeConnections() {
    const fastify = this.getFastify()

    try {
      const connections = await prisma.redisConnection.findMany()

      for (const connection of connections) {
        const connectionData = {
          id: connection.id,
          host: connection.host,
          name: connection.name,
          port: connection.port,
          db: connection.db,
          password: connection.password || undefined,
        }

        const redisInstance: RedisInstance = {
          client: this.createRedisClient(connectionData),
          connection: connection,
          isConnected: false,
        }

        redisInstance.client.on("connect", () => {
          redisInstance.isConnected = true
          fastify.log.info(`Redis connected: ${connection.name}`)
        })

        redisInstance.client.on("error", (error) => {
          redisInstance.isConnected = false
          fastify.log.error(`Redis error (${connection.name}): ${error.message}`)
        })

        this.instances.set(connection.id, redisInstance)
      }
    } catch (error) {
      fastify.log.error("Error initializing Redis connections:", error as any)
    }
  }

  public static getInstance(connectionId: string): RedisInstance | undefined {
    return this.instances.get(connectionId)
  }

  public static getAllInstances(): Map<string, RedisInstance> {
    return this.instances
  }

  public static async addConnection(input: RedisAddConnectionDtoType): Promise<RedisInstance> {
    const fastify = this.getFastify()

    const connection = await prisma.redisConnection.create({
      data: {
        ...input,
        displayName: input.name,
        name: slug(input.name),
      },
    })

    const redisInstance: RedisInstance = {
      client: this.createRedisClient(input),
      connection,
      isConnected: false,
    }

    redisInstance.client.on("connect", () => {
      redisInstance.isConnected = true
      fastify.log.info(`Redis connected: ${connection.name}`)
    })

    redisInstance.client.on("error", (error: any) => {
      redisInstance.isConnected = false
      fastify.log.error(`Redis error (${connection.name}):`, error)
    })

    this.instances.set(connection.id, redisInstance)

    return redisInstance
  }

  public static async removeConnection(connectionId: string): Promise<void> {
    const instance = this.instances.get(connectionId)
    if (instance) {
      await instance.client.quit()
      this.instances.delete(connectionId)

      await prisma.redisConnection.delete({
        where: { id: connectionId },
      })
    }
  }

  public static async testConnection(connection: RedisAddConnectionDtoType): Promise<boolean> {
    const testClient = this.createRedisClient(connection)

    return new Promise((resolve) => {
      testClient.on("connect", () => {
        testClient.quit()
        resolve(true);
      })

      testClient.on("error", () => {
        testClient.quit()
        resolve(false)
      })
    })
  }

  public static async shutdown(): Promise<void> {
    const fastify = this.getFastify()

    for (const [id, instance] of this.instances) {
      try {
        await instance.client.quit()
        fastify.log.info(`Redis connection closed: ${instance.connection.name}`)
      } catch (error: any) {
        fastify.log.error(`Error closing Redis connection ${id}:`, error)
      }
    }

    this.instances.clear()
    this.fastify = null
  }
}

export default RedisManager
