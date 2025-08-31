import { RedisOptions } from "ioredis";
import RedisInstance from "./redis.instance";
import prisma from "@server/lib/prisma";

class RedisRegistry {
  private inited = false;
  private entities: Map<string, RedisInstance> = new Map();

  private async init() {
    const connectionsList = await prisma.redisConnection.findMany();

    for (const connection of connectionsList) {
      try {
        this.register(connection.name, {
          host: connection.host,
          port: connection.port,
          password: connection.password || undefined,
          db: connection.db || 0,
        });
      } catch (err) {
        console.error(`Failed to register Redis connection "${connection.name}":`, err);
      }
    }

    this.inited = true;
  }

  async register(name: string, config: RedisOptions) {
    if (this.entities.has(name)) {
      throw new Error(`Redis entity "${name}" already registered`);
    }
    const entity = new RedisInstance(name, config);
    this.entities.set(name, entity);
    return entity;
  }

  async get(name: string): Promise<RedisInstance> {
    if (!this.inited) await this.init();
    const entity = this.entities.get(name);
    if (!entity) throw new Error(`Redis entity "${name}" not found`);
    return entity;
  }

  async list() {
    if (!this.inited) await this.init();
    return Array.from(this.entities.keys());
  }
}

const globalForRegistry = globalThis as unknown as { redisRegistry?: RedisRegistry };

export const redisRegistry = globalForRegistry.redisRegistry ?? new RedisRegistry();

if (process.env.NODE_ENV !== "production") globalForRegistry.redisRegistry = redisRegistry;
