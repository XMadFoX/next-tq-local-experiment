import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Next.js PWA",
    short_name: "NextPWA",
    description: "A Progressive Web App built with Next.js",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/icon-144.svg",
        sizes: "144x144",
        type: "image/svg",
        purpose: "any",
      },
      {
        src: "/icon-256.png",
        sizes: "256x256",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-400.svg",
        sizes: "400x400",
        type: "image/svg",
      },
    ],
    screenshots: [
      {
        src: "/1920x1080.png",
        sizes: "1920x1080",
        type: "image/png",
        form_factor: "wide",
      },
    ],
  };
}
