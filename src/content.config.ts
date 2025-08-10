import { defineCollection, z } from "astro:content";
import { file, glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({
    base: "./contents/blog",
    pattern: "**/*.md",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    published: z.date(),
    updated: z.date().optional(),
    tags: z.array(z.string()).optional(),
    coverImage: z.string().optional(),
  }),
});

const zenn = defineCollection({
  loader: file("./contents/zenn/articles.json"),
  schema: z.object({
    title: z.string(),
    url: z.string().url(),
    published: z.string().transform((date) => new Date(date)),
    ogImage: z.string().url(),
  }),
});

export const collections = { blog, zenn };
