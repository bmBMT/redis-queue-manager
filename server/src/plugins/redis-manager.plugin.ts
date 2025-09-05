// plugins/redis-manager-plugin.ts
import { FastifyPluginAsync } from 'fastify';
import RedisManager from '../common/redis/redis-manager';

const redisManagerPlugin: FastifyPluginAsync = async (fastify) => {
  RedisManager.initialize(fastify);

  await RedisManager.initializeConnections();

  fastify.addHook('onClose', async () => {
    await RedisManager.shutdown();
  });
};

export default redisManagerPlugin;