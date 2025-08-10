import type { APIRoute, GetStaticPaths } from "astro";
import { getEntries, getEntryBySlug, makeOpenGraphImage } from "@/lib";

export const GET: APIRoute = async ({ params }) => {
  const slug = params.slug;
  if (!slug) {
    return new Response(null, { status: 404, statusText: "Not Found" });
  }

  const entry = await getEntryBySlug("blog", slug);
  if (!entry) {
    return new Response(null, { status: 404, statusText: "Not Found" });
  }

  const title = entry.data.title;
  const openGraphImage = await makeOpenGraphImage(title);
  return new Response(openGraphImage, {
    headers: {
      "Content-Type": "image/png",
    },
  });
};

export const getStaticPaths: GetStaticPaths = async () => {
  const entries = await getEntries("blog");
  return entries.map((entry) => ({ params: { slug: entry.id } }));
};
