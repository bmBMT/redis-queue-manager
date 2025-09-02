import redisRouter from "./resources/redis/redis.router";
import { router } from "./trpc";

export const appRouter = router({
  redis: redisRouter,
});

export type AppRouter = typeof appRouter;
