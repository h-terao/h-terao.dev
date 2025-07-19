// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import expressiveCode from "astro-expressive-code";
import rehypeCallouts from "rehype-callouts";
import rehypeMathML from "@daiji256/rehype-mathml";
import remarkMath from "remark-math";
import remarkLinkCard from "remark-link-card-plus";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    expressiveCode({
      themeCssSelector: () => `[data-theme="catppuccin-latte"]`,
    }),
    mdx(),
    sitemap(),
  ],
  markdown: {
    rehypePlugins: [rehypeCallouts, rehypeMathML],
    remarkPlugins: [remarkMath, [remarkLinkCard, { cache: false, shortenUrl: true }]],
  },
});
