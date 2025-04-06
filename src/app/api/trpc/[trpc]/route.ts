import { appRouter } from "@/server/routers/_app";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

export const dynamic = "force-dynamic";

const handler = async (req: Request) => {
  console.log(`incoming request ${req.url}`);

  const res = await fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
  });

  return res;
};

const preflightHandler = async () => {
  const res = new Response(null, { status: 204 });

  return res;
};

export { handler as GET, handler as POST, preflightHandler as OPTIONS };
