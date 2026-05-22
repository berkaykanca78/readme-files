import { Injectable } from '@angular/core';

import { CATEGORIES_MANIFEST } from '../data/categories.manifest';
import { Category } from '../models/category.model';

@Injectable({ providedIn: 'root' })
export class CategoriesService {
  list(): Category[] {
    return [...CATEGORIES_MANIFEST];
  }

  getBySlug(slug: string): Category | undefined {
    return CATEGORIES_MANIFEST.find((c) => c.slug === slug);
  }

  getLabel(slug: string): string {
    return this.getBySlug(slug)?.label ?? slug;
  }
}
