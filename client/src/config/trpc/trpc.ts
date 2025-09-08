import { AppRouter } from '../../../../server/src/router'
import { createTRPCReact, getFetch, httpBatchLink, loggerLink } from "@trpc/react-query"
import getAuthHeaders from '@/shared/utils/getAuthHeaders'

export const trpc = createTRPCReact<AppRouter>({
  abortOnUnmount: true,
})

export const initTrpcClient = () =>
  trpc.createClient({
    links: [
      loggerLink({
        enabled: () => process.env.NODE_ENV === "development" && !!globalThis.window,
      }),
      httpBatchLink({
        url: process.env.NEXT_PUBLIC_BACKEND_URL,
        headers: getAuthHeaders,
        fetch: async (input, init?) => {
          const fetch = getFetch()
          return fetch(input, {
            ...init,
            credentials: "include",
          })
        },
      }),
    ],
  })
