import fs from "node:fs/promises";
import path from "node:path";

const baseURL = "https://zenn.dev/api/articles";
const userName = "wintery_fish";

const fetchArticles = async (userName: string) => {
  const allArticles = [];
  let page: number = 1;
  while (true) {
    const resp = await fetch(
      `${baseURL}?username=${encodeURIComponent(userName)}&order=latest&page=${page}`,
      { headers: { accept: "application/json" } },
    );
    if (!resp.ok) {
      throw new Error(`Failed to fetch articles: ${resp.statusText}`);
    }

    const resp_json = await resp.json();
    for (const article of resp_json.articles) {
      allArticles.push({
        id: article.path,
        title: article.title,
        url: `https://zenn.dev${article.path}`,
        published: new Date(article.published_at),
      });
    }
    if (!resp_json.next_page) break;
    page = resp_json.next_page;
  }
  return allArticles;
};

const fetchOpenGraph = async (url: string) => {
  try {
    const html = await fetch(url, { headers: { "user-agent": "OGFetcher/1.0" } }).then((r) =>
      r.text(),
    );
    const m = html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i);
    return m?.[1] ?? null;
  } catch {
    return null;
  }
};

const articles = await fetchArticles(userName);

const enriched = [];
for (const article of articles) {
  const ogImage = await fetchOpenGraph(article.url);
  enriched.push({ ...article, ogImage });
}

await fs.mkdir("./contents/zenn", { recursive: true });
await fs.writeFile("./contents/zenn/articles.json", JSON.stringify(enriched, null, 2));
console.log(`Saved ${enriched.length} items to ./contents/zenn/articles.json`);
