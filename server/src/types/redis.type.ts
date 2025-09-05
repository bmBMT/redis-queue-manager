import { RedisConnection } from '@redis-queue-manager/prisma';
import RedisEntity from '../common/redis/redis.entity';

export interface RedisInstance {
  client: RedisEntity;
  connection: RedisConnection;
  isConnected: boolean;
}