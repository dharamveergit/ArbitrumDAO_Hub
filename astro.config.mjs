import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel/serverless";
import keystatic from "@keystatic/astro";
import markdoc from "@astrojs/markdoc";

// https://astro.build/config
export default defineConfig({
  site: "https://www.arbitrumhub.io",
  integrations: [
    mdx(),
    sitemap(),
    tailwind({
      applyBaseStyles: false,
    }),
    icon(),
    react(),
    markdoc(),
    keystatic(),
  ],

  output: "hybrid",
  adapter: vercel(),
  redirects: {
    "/community-hub/initiatives/events/": "/community-hub/initiatives/event/",
  },
});
