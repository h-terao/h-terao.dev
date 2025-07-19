# h-terao.dev

このリポジトリは、個人ブログ [h-terao.dev](https://h-terao.dev) のソースコードをまとめたものです。

## 💪 技術スタック

以下の技術スタックで構築しています。

- [Bun](https://bun.com/)
- [Astro](https://astro.build/)
- [Iconify](https://iconify.design/)
- [Tailwind CSS](https://tailwindcss.com/)

## 📝 記事の新規作成

記事を作成するには、`src/pages/blog/` ディレクトリ内に Markdown ファイルを作成します。各 Markdown ファイルは個別のブログ記事として扱われます。

マークダウンには、以下のフロントマターを含めてください。
ただし、`title` と `published` 以外のフィールドはオプションです。

```markdown
---
title: "The blog title"
description: "A short description of the blog post"
published: 2025-07-06
updated: 2025-07-06
tags: [tag1, tag2]
coverImage: ./cover-image.jpg
---
```

## 📌 プロジェクトの新規作成

プロジェクトを追加するには、`src/site.config.ts` ファイルの `projectGroups` に新しいオブジェクトを追加します。

```typescript
export const projectGroups: ProjectGroup[] = [
  {
    title: "Project Group Title", // プロジェクトグループのタイトル
    projects: [
      {
        title: "Project Title",
        description: "A short description of the project",
        link: "https://example.com", // プロジェクトのメインリンク。カードをクリックしたときに開くリンク
        codeLink: "https://example.com",  // GitHub へのリンク (optional)
        documentLink: "https://example.com/docs", // ドキュメントへのリンク (optional)
        siteLink: "https://example.com", // プロジェクトのサイトへのリンク (optional)
      },
      // 他のプロジェクト...
    ],
  },
];
```

## 🪄 Astroコマンド

すべてのコマンドは、プロジェクトのルートからターミナルで実行されます。

| Command             | Action                                       |
| :-------------------| :--------------------------------------------|
| `bun install`       | Installs dependencies                        |
| `bunx astro build`   | Build your production site to `./dist/`      |
| `bunx astro dev`     | Start local dev server at `localhost:4321`   |
| `bunx astro preview` | Preview your build locally, before deploying |
