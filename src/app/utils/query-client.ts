import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import {
  defaultShouldDehydrateQuery,
  QueryClient,
} from "@tanstack/react-query";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import superjson from "superjson";
export function makeQueryClient() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30 * 1000,
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
  const localStoragePersister = createSyncStoragePersister({
    storage: window.localStorage,
  });
  // const sessionStoragePersister = createSyncStoragePersister({ storage: window.sessionStorage })

  persistQueryClient({
    queryClient,
    persister: localStoragePersister,
  });

  return queryClient;
}
