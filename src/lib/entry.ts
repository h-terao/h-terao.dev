import { type CollectionEntry, getCollection } from "astro:content";
import type { Collection, Tag } from "@/types.ts";

export const getEntries = async <T extends Collection>(
  collection: T,
): Promise<CollectionEntry<T>[]> => {
  const entries: CollectionEntry<T>[] = await getCollection(collection);
  return entries.sort((a, b) => {
    const dateA = new Date(a.data.published);
    const dateB = new Date(b.data.published);
    return dateB.getTime() - dateA.getTime(); // Newer entries first
  });
};

export const getEntryBySlug = async <T extends Collection>(
  collection: T,
  slug: string,
): Promise<CollectionEntry<T> | undefined> => {
  const entries: CollectionEntry<T>[] = await getCollection(
    collection,
    (entry) => entry.id === slug,
  );
  return entries.length > 0 ? entries[0] : undefined;
};

export const getTagByName = (name: string): Tag => {
  return {
    name: `#${name}`,
    link: `/blog/tags/${name}`,
  };
};

export const groupEntriesByTag = <T extends Collection>(
  entries: CollectionEntry<T>[],
): { [tag: string]: CollectionEntry<T>[] } => {
  if (entries.length === 0) return {};
  return entries.reduce(
    (acc, entry) => {
      // only read tags when they exist on this entry's data
      const tags = "tags" in entry.data ? (entry.data.tags ?? []) : [];
      tags.forEach((tag) => {
        if (!acc[tag]) acc[tag] = [];
        acc[tag].push(entry);
      });
      return acc;
    },
    {} as { [tag: string]: CollectionEntry<T>[] },
  );
};

export const getTags = <T extends Collection>(entries: CollectionEntry<T>[]): Tag[] => {
  const groupedEntriesByTag = groupEntriesByTag(entries);
  return Object.keys(groupedEntriesByTag)
    .sort((a, b) => {
      const countA = groupedEntriesByTag[a].length;
      const countB = groupedEntriesByTag[b].length;
      return countB - countA; // Sort by count descending
    })
    .map(getTagByName);
};

export const groupEntriesByYear = <T extends Collection>(
  entries: CollectionEntry<T>[],
): { [year: number]: CollectionEntry<T>[] } => {
  return entries.reduce(
    (acc, entry) => {
      const date = new Date(entry.data.published);
      const year = date.getFullYear();
      if (!acc[year]) acc[year] = [];
      acc[year].push(entry);
      return acc;
    },
    {} as { [year: number]: CollectionEntry<T>[] },
  );
};
