import { Category } from '../models/category.model';

/**
 * md-files altındaki her klasör için bir kayıt ekleyin.
 * slug / folder, klasör adıyla aynı olmalı (ör. md-files/database → slug: database).
 */
export const CATEGORIES_MANIFEST: Category[] = [
  {
    slug: 'database',
    label: 'Veritabanı',
    folder: 'database',
  },
];
