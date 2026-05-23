import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';

import { POSTS_MANIFEST } from '../data/posts.manifest';
import { Post, PostMeta } from '../models/post.model';
import { CategoriesService } from './categories.service';
import { MarkdownService } from './markdown.service';

export interface PostFilter {
  category?: string | null;
  query?: string | null;
}

export type PostFetchResult =
  | { status: 'ok'; post: Post }
  | { status: 'missing' }
  | { status: 'load-failed'; filePath: string };

@Injectable({ providedIn: 'root' })
export class PostsService {
  private readonly http = inject(HttpClient);
  private readonly markdown = inject(MarkdownService);
  private readonly categories = inject(CategoriesService);
  private readonly document = inject(DOCUMENT);

  listMeta(filter?: PostFilter): PostMeta[] {
    let posts = [...POSTS_MANIFEST];

    if (filter?.category) {
      posts = posts.filter((p) => p.category === filter.category);
    }

    const q = filter?.query?.trim().toLowerCase();
    if (q) {
      posts = posts.filter((p) => this.matchesQuery(p, q));
    }

    return posts.sort((a, b) => {
      const da = a.publishedAt ?? '';
      const db = b.publishedAt ?? '';
      return db.localeCompare(da);
    });
  }

  getMetaBySlug(slug: string): PostMeta | undefined {
    return POSTS_MANIFEST.find((p) => p.slug === slug);
  }

  getBySlug(slug: string): Observable<PostFetchResult> {
    const meta = this.getMetaBySlug(slug);
    if (!meta) {
      return of({ status: 'missing' });
    }
    return this.loadPost(meta).pipe(
      map((post) => ({ status: 'ok' as const, post })),
      catchError(() => of({ status: 'load-failed' as const, filePath: meta.filePath })),
    );
  }

  private matchesQuery(post: PostMeta, query: string): boolean {
    const haystack = [
      post.title,
      post.excerpt,
      post.category,
      this.categories.getLabel(post.category),
      ...(post.tags ?? []),
    ]
      .join(' ')
      .toLowerCase();

    return haystack.includes(query);
  }

  private loadPost(meta: PostMeta): Observable<Post> {
    return this.http.get(this.assetUrl(meta.filePath), { responseType: 'text' }).pipe(
      map((raw) => {
        const trimmed = raw.trimStart().toLowerCase();
        if (trimmed.startsWith('<!doctype') || trimmed.startsWith('<html')) {
          throw new Error('Markdown path returned HTML');
        }
        return {
          ...meta,
          contentHtml: this.markdown.parseArticle(raw),
        };
      }),
    );
  }

  private assetUrl(path: string): string {
    const baseHref = this.document.querySelector('base')?.href ?? `${this.document.location.origin}/`;
    return new URL(path.replace(/^\//, ''), baseHref).pathname;
  }
}
