import type { ProjectGroup, SiteConfig } from "@/types.ts";

export const siteConfig: SiteConfig = {
  title: "h-terao.dev",
  author: "h-terao",
  description: "見習いITエンジニアの個人ブログ",
  url: "https://h-terao.dev",
  lang: "ja",
  headerMenus: [
    { name: "Blog", link: "/blog" },
    { name: "Zenn", link: "/zenn" },
    { name: "Projects", link: "/projects" },
  ],
  footer: [
    { name: "GitHub", link: "https://github.com/h-terao", icon: "iconoir:github" },
    { name: "X", link: "https://x.com/wintery_fish", icon: "iconoir:x" },
  ],
};

export const projectGroups: ProjectGroup[] = [];

export const githubUser = "h-terao";
