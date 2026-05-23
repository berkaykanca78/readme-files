import { DatePipe, NgStyle } from '@angular/common';
import { Component, inject, input, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Post } from '../../core/models/post.model';
import { CategoriesService } from '../../core/services/categories.service';
import { PostsService } from '../../core/services/posts.service';
import { CHAOS_STICKERS, ChaosSticker } from '../../shared/data/chaos.data';
import { MarkdownContentComponent } from '../../shared/components/markdown-content/markdown-content.component';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [RouterLink, DatePipe, NgStyle, MarkdownContentComponent],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.scss',
})
export class PostDetailComponent implements OnInit {
  private readonly postsService = inject(PostsService);
  private readonly categoriesService = inject(CategoriesService);

  readonly slug = input.required<string>();

  readonly post = signal<Post | undefined>(undefined);
  readonly loading = signal(true);
  readonly notFound = signal(false);
  readonly leftStickers = CHAOS_STICKERS.filter((sticker) => sticker.zone === 'left');
  readonly rightStickers = CHAOS_STICKERS.filter((sticker) => sticker.zone === 'right');

  ngOnInit(): void {
    this.postsService.getBySlug(this.slug()).subscribe({
      next: (result) => {
        this.loading.set(false);
        if (!result) {
          this.notFound.set(true);
          return;
        }
        this.post.set(result);
      },
      error: () => {
        this.loading.set(false);
        this.notFound.set(true);
      },
    });
  }

  categoryLabel(slug: string): string {
    return this.categoriesService.getLabel(slug);
  }

  chaosWrapStyle(sticker: ChaosSticker): Record<string, string> {
    return {
      top: `${sticker.topPercent}%`,
      '--chaos-delay': `${sticker.delay}s`,
      '--chaos-duration': `${sticker.duration}s`,
      '--chaos-dx': `${sticker.driftX}px`,
      '--chaos-dy': `${sticker.driftY}px`,
    };
  }
}
