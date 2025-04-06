"use client";

import { trpc } from "./utils/trpc";

function ClientLayout({ children }: { children: React.ReactNode }) {
  return children;
}

export default trpc.withTRPC(ClientLayout);
