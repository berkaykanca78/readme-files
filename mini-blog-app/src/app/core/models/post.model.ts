export interface PostMeta {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  /** Path served from assets, e.g. /md-files/database/foo.md */
  filePath: string;
  publishedAt?: string;
  tags?: string[];
  readingMinutes?: number;
  /** Kapak görseli — md-files veya public altından */
  coverImage?: string;
}

export interface Post extends PostMeta {
  contentHtml: string;
}
