import { DatePipe, NgStyle } from '@angular/common';
import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { combineLatest, map } from 'rxjs';

import { PostMeta } from '../../core/models/post.model';
import { CategoriesService } from '../../core/services/categories.service';
import { PostsService } from '../../core/services/posts.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, DatePipe, NgStyle],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, AfterViewInit {
  private readonly postsService = inject(PostsService);
  private readonly categoriesService = inject(CategoriesService);
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);

  readonly posts = signal<PostMeta[]>([]);
  readonly activeCategory = signal<string | null>(null);
  readonly activeCategoryLabel = signal<string | null>(null);
  readonly searchQuery = signal('');
  readonly parallaxOffset = signal(0);

  private readonly heroRef = viewChild<ElementRef<HTMLElement>>('hero');

  ngOnInit(): void {
    combineLatest([this.route.paramMap, this.route.queryParamMap])
      .pipe(
        map(([params, queryParams]) => ({
          category: params.get('category'),
          query: queryParams.get('q'),
        })),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(({ category, query }) => {
        this.activeCategory.set(category);
        this.activeCategoryLabel.set(category ? this.categoriesService.getLabel(category) : null);
        this.searchQuery.set(query ?? '');
        this.posts.set(
          this.postsService.listMeta({
            category,
            query,
          }),
        );
      });
  }

  ngAfterViewInit(): void {
    const onScroll = (): void => {
      const hero = this.heroRef()?.nativeElement;
      if (!hero) {
        return;
      }
      const rect = hero.getBoundingClientRect();
      const progress = Math.max(0, -rect.top);
      this.parallaxOffset.set(progress);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    this.destroyRef.onDestroy(() => window.removeEventListener('scroll', onScroll));
  }

  parallaxStyle(layer: number): Record<string, string> {
    const offset = this.parallaxOffset() * layer * 0.08;
    return { transform: `translate3d(0, ${offset}px, 0)` };
  }

  categoryLabel(slug: string): string {
    return this.categoriesService.getLabel(slug);
  }
}
