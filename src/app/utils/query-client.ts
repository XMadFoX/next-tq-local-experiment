import {
  defaultShouldDehydrateQuery,
  QueryClient,
} from "@tanstack/react-query";
import { PersistQueryClientOptions } from "@tanstack/react-query-persist-client";
import superjson from "superjson";
import { createIDBPersister } from "./persister";

const idbStoragePersister = createIDBPersister();

export const persistOptions: Omit<PersistQueryClientOptions, "queryClient"> = {
  persister: idbStoragePersister,
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

  return queryClient;
}
