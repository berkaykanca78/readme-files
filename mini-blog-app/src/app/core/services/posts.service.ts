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
    return this.http.get(meta.filePath, { responseType: 'text' }).pipe(
      map((raw) => ({
        ...meta,
        contentHtml: this.markdown.parseArticle(raw),
      })),
    );
  }
}
