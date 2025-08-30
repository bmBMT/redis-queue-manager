"use client";

import { httpBatchLink, getFetch, loggerLink } from "@trpc/client";
import { useState } from "react";
import { trpc } from "./trpc";
import { queryClientPersister, queryClient } from "./query-client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";

export const TrpcProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        loggerLink({
          enabled: () => true,
        }),
        httpBatchLink({
          url: "/api/trpc",
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
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <PersistQueryClientProvider client={queryClient} persistOptions={{ persister: queryClientPersister }}>
        {children}
        <ReactQueryDevtools />
      </PersistQueryClientProvider>
    </trpc.Provider>
  );
};
