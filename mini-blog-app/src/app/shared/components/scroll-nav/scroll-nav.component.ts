import { afterNextRender, Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent, throttleTime } from 'rxjs';

@Component({
  selector: 'app-scroll-nav',
  standalone: true,
  templateUrl: './scroll-nav.component.html',
  styleUrl: './scroll-nav.component.scss',
})
export class ScrollNavComponent {
  private readonly destroyRef = inject(DestroyRef);

  readonly showTop = signal(false);
  readonly showBottom = signal(false);

  private readonly edgeThreshold = 96;

  constructor() {
    afterNextRender(() => {
      this.updateVisibility();

      fromEvent(window, 'scroll', { passive: true })
        .pipe(throttleTime(60), takeUntilDestroyed(this.destroyRef))
        .subscribe(() => this.updateVisibility());

      fromEvent(window, 'resize', { passive: true })
        .pipe(throttleTime(150), takeUntilDestroyed(this.destroyRef))
        .subscribe(() => this.updateVisibility());
    });
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: this.scrollBehavior() });
  }

  scrollToBottom(): void {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

    window.scrollTo({
      top: maxScroll,
      behavior: this.scrollBehavior(),
    });
  }

  private updateVisibility(): void {
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    const maxScroll = Math.max(docHeight - viewportHeight, 0);
    const edge = this.edgeThreshold;

    const canScroll = maxScroll > edge;
    const nearTop = scrollY <= edge;
    const nearBottom = scrollY >= maxScroll - edge;

    this.showTop.set(canScroll && !nearTop);
    this.showBottom.set(canScroll && !nearBottom);
  }

  private scrollBehavior(): ScrollBehavior {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
  }
}
