import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

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

export const collections = { blog };
