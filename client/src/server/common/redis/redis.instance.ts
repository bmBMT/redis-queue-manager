import Redis, { RedisOptions } from "ioredis";

class RedisInstance {
  public instance: Redis;

  constructor(public name: string, config: RedisOptions) {
    this.instance = new Redis({
      connectionName: name,
      ...config,
      lazyConnect: true,
    });

    this.instance.on("connect", () => {
      console.log(`✅ Redis [${this.name}] connected (db=${config.db ?? 0})`);
    });

    this.instance.on("error", err => {
      console.error(`❌ Redis [${this.name}] connection error:`, err);
      this.instance.quit();
    });
  }

  async getQueueNames() {
    const queues: string[] = [];
    let cursor = "0";

    do {
      const [nextCursor, keys] = await this.instance.scan(cursor, "MATCH", "bull:*", "COUNT", 100);

      cursor = nextCursor;
      queues.push(...keys.map(k => k.split(":")[1]));
    } while (cursor !== "0");

    return [...new Set(queues)];
  }

  async getInfo() {
    return {
      name: this.name,
      status: this.instance.status,
      queues: await this.getQueueNames(),
    };
  }
}

export default RedisInstance;
