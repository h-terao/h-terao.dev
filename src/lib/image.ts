import type { CollectionEntry } from "astro:content";
import path from "node:path";
import type { ImageMetadata } from "astro";
import type { Collection } from "@/types.ts";

export const fetchCoverImage = async (
  entry: CollectionEntry<Collection>,
): Promise<ImageMetadata | null> => {
  const { coverImage: imagePath } = { coverImage: undefined, ...entry.data };
  if (!imagePath) return null;

  const imageAssets = import.meta.glob<ImageMetadata>("/**/*.{png,jpg,jpeg,gif,webp,avif}", {
    import: "default",
  });

  let imageSrc = imagePath;
  if (!imagePath.startsWith("/")) {
    // imagePath is relative, resolve it based on the entry file path
    const entryPath = entry.filePath;
    if (!entryPath) throw new Error(`Entry file path not found for ${entry.id}`);
    imageSrc = path.normalize(path.join("/", ...entryPath.split("/").slice(0, -1), imagePath));
  }

  if (!imageAssets[imageSrc]) throw new Error(`Image not found: ${imageSrc}`);
  return await imageAssets[imageSrc]();
};
