import { createServerSideHelpers } from '@trpc/react-query/server';
import { publicProcedure, router } from './trpc';

export const appRouter = router({
  greeting: publicProcedure.query(() => "hello tRPC v10!"),
});

export type AppRouter = typeof appRouter;

export const createSSRHelper = () =>
  createServerSideHelpers({
    router: appRouter,
    ctx: () => { },
  });