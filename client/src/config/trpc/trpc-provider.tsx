"use client"

import { useState } from "react"
import { initTrpcClient, trpc } from "./trpc"
import { queryClientPersister, queryClient } from "./query-client"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client"

export const TrpcProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [trpcClient] = useState(initTrpcClient)

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <PersistQueryClientProvider client={queryClient} persistOptions={{ persister: queryClientPersister }}>
        {children}
        <ReactQueryDevtools />
      </PersistQueryClientProvider>
    </trpc.Provider>
  )
}
