import { type AppRouter } from "@server/router";
import { createTRPCReact, getFetch, httpBatchLink, loggerLink } from "@trpc/react-query";

export const trpc = createTRPCReact<AppRouter>({
  abortOnUnmount: true,
});

export const initTrpcClient = () =>
  trpc.createClient({
    links: [
      loggerLink({
        enabled: () => process.env.NODE_ENV === "development",
      }),
      httpBatchLink({
        url: process.env.NEXT_PUBLIC_BACKEND_URI,
        fetch: async (input, init?) => {
          const fetch = getFetch();
          return fetch(input, {
            ...init,
            credentials: "include",
          });
        },
      }),
    ],
  })