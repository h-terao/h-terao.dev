export type Collection = "blog" | "zenn";

export type SiteConfig = {
  title: string;
  author: string;
  description: string;
  url: string;
  lang: string;
  headerMenus: { name: string; link: string }[];
  footer: { name: string; link: string; icon: string }[];
};

export type Tag = {
  name: string;
  link: string;
};

export type ProjectGroup = {
  name: string;
  description?: string;
  projects: {
    name: string;
    description: string;
    /** Main Link */
    link?: string;
    /** Code Repository Link */
    codeLink?: string;
    /** Documentation Link */
    documentLink?: string;
    /** Site Link */
    siteLink?: string;
  }[];
};
