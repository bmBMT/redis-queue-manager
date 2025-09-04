import RedisEntity from '@/common/redis/redis.entity';
import { RedisConnection } from '@redis-queue-manager/prisma';

export interface RedisInstance {
  client: RedisEntity;
  connection: RedisConnection;
  isConnected: boolean;
}