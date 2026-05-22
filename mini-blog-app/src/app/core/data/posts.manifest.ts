import { PostMeta } from '../models/post.model';

/**
 * Yeni yazı eklemek için buraya bir kayıt ekleyin.
 * category, md-files altındaki klasör adıyla eşleşmeli (categories.manifest.ts).
 * filePath: /md-files/{category}/dosya.md
 */
export const POSTS_MANIFEST: PostMeta[] = [
  {
    slug: 'acid-base-cap',
    title: '(ACID, BASE Modelleri) ve (CAP Teoremi): Veritabanında Tutarlılık',
    excerpt:
      'CAP teoremi, ACID ve BASE modelleri — dağıtık sistemlerde tutarlılık ve ölçeklenebilirlik arasındaki denge.',
    category: 'database',
    filePath: '/md-files/database/acid_base_cap_readme_tr.md',
    publishedAt: '2026-05-23',
    tags: ['ACID', 'BASE', 'CAP', 'tutarlılık'],
    readingMinutes: 2,
    coverImage: '/md-files/database/images/database-consistency-hero.png',
  },
];
