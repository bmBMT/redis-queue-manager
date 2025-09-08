import { createServerSideHelpers } from "@trpc/react-query/server"
import { initTrpcClient } from "@//config/trpc/trpc"
import { AppRouter } from "../../../../server/src/router"

export const createSSRHelper = () =>
  createServerSideHelpers<AppRouter>({
    client: initTrpcClient(),
  })
