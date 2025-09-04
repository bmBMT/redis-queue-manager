// plugins/redis-manager-plugin.ts
import RedisManager from '@/common/redis/redis-manager';
import { FastifyPluginAsync } from 'fastify';

const redisManagerPlugin: FastifyPluginAsync = async (fastify) => {
  RedisManager.initialize(fastify);

  await RedisManager.initializeConnections();

  fastify.addHook('onClose', async () => {
    await RedisManager.shutdown();
  });
};

export default redisManagerPlugin;