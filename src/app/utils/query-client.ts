import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import {
  defaultShouldDehydrateQuery,
  QueryClient,
} from "@tanstack/react-query";
import {
  persistQueryClient,
  PersistQueryClientOptions,
} from "@tanstack/react-query-persist-client";
import superjson from "superjson";

export const localStoragePersister = createSyncStoragePersister({
  storage: typeof window !== "undefined" ? window.localStorage : undefined,
});

export const persistOptions: Omit<PersistQueryClientOptions, "queryClient"> = {
  persister: localStoragePersister,
  maxAge: 1000 * 60 * 60 * 24, // 24 hours
};

export function makeQueryClient() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        networkMode: "offlineFirst",
        gcTime: 1000 * 60 * 60 * 24, // 24 hours
        staleTime: 1000 * 60 * 5, // 5 minutes
        enabled: navigator.onLine,
        retry: false,
      },
      dehydrate: {
        // serializeData: superjson.serialize,
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === "pending",
      },
      hydrate: {
        deserializeData: superjson.deserialize,
      },
    },
  });

  if (typeof window === "undefined") {
    return queryClient;
  }

  // const sessionStoragePersister = createSyncStoragePersister({ storage: window.sessionStorage })

  persistQueryClient({ ...persistOptions, queryClient });

  return queryClient;
}
