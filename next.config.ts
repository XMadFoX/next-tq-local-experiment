import withSerwistInit from "@serwist/next";
import type { NextConfig } from "next";

const withSerwist = withSerwistInit({
  swSrc: "src/app/sw.ts",
  swDest: "public/sw.js",
  dontCacheBustURLsMatching: /^api\/trpc/,
});

const nextConfig: NextConfig = {
  /* config options here */
};

export default withSerwist(nextConfig);
