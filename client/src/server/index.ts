import { createServerSideHelpers } from '@trpc/react-query/server';
import RedisRouter from './resources/redis/redis.router';
import { router } from "./trpc";

export const appRouter = router({
  redis: RedisRouter.router,
});

export type AppRouter = typeof appRouter;

export const createSSRHelper = () =>
  createServerSideHelpers({
    router: appRouter,
    ctx: () => { },
  });