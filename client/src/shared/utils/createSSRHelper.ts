import { AppRouter } from "@server/router"
import { createServerSideHelpers } from "@trpc/react-query/server"
import { initTrpcClient } from '~/src/config/trpc/trpc'


export const createSSRHelper = () =>
  createServerSideHelpers<AppRouter>({
    client: initTrpcClient(),
    ctx: () => {},
  })
