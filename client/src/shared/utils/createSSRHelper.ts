import { AppRouter, appRouter } from '@server/router';
import { createServerSideHelpers } from '@trpc/react-query/server';

export const createSSRHelper = () =>
  createServerSideHelpers<AppRouter>({
    router: appRouter,
    ctx: () => { },
  });