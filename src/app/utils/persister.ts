import { get, set, del } from "idb-keyval";
import {
  PersistedClient,
  Persister,
} from "@tanstack/react-query-persist-client";

/**
 * Creates an Indexed DB persister
 * @see https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
 */
export function createIDBPersister(idbValidKey: IDBValidKey = "reactQuery") {
  return {
    persistClient: async (client: PersistedClient) => {
      console.log("Persisting client", client);
      await set(idbValidKey, client);
    },
    restoreClient: async () => {
      const res = await get<PersistedClient>(idbValidKey);
      console.log("Restoring client", res);
      return res;
    },
    removeClient: async () => {
      console.log("Removing client");
      await del(idbValidKey);
    },
  } satisfies Persister;
}
