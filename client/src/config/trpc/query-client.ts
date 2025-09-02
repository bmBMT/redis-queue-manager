import { QueryClient } from "@tanstack/react-query";
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'
import { ONE_DAY, ONE_MINUTE } from '@redis-queue-manager/shared';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: ONE_MINUTE * 2,
      gcTime: ONE_DAY,
    },
  },
});

export const queryClientPersister = createAsyncStoragePersister({
  storage: typeof window !== 'undefined' ? window.localStorage : undefined,
})