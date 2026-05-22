import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { debounceTime, distinctUntilChanged, filter, Subject } from 'rxjs';

import { Category } from '../../core/models/category.model';
import { CategoriesService } from '../../core/services/categories.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  private readonly categoriesService = inject(CategoriesService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly searchInput$ = new Subject<string>();

  readonly categories = signal<Category[]>([]);
  readonly searchQuery = signal('');

  ngOnInit(): void {
    this.categories.set(this.categoriesService.list());

    this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => this.syncSearchFromUrl());

    this.searchInput$
      .pipe(debounceTime(250), distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
      .subscribe((q) => this.navigateWithSearch(q));

    this.syncSearchFromUrl();
  }

  onSearchInput(value: string): void {
    this.searchQuery.set(value);
    this.searchInput$.next(value);
  }

  clearSearch(): void {
    this.searchQuery.set('');
    this.navigateWithSearch('');
  }

  private syncSearchFromUrl(): void {
    const q = this.router.parseUrl(this.router.url).queryParams['q'] ?? '';
    this.searchQuery.set(q);
  }

  private navigateWithSearch(query: string): void {
    const segments = this.router.parseUrl(this.router.url).root.children['primary']?.segments ?? [];
    const trimmed = query.trim();

    let commands: string[];
    if (segments[0]?.path === 'kategori' && segments[1]) {
      commands = ['/kategori', segments[1].path];
    } else {
      commands = ['/'];
    }

    this.router.navigate(commands, {
      queryParams: { q: trimmed || null },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }
}
