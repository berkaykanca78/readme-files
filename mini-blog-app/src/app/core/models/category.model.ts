/** md-files altındaki klasör adı = kategori slug */
export interface Category {
  slug: string;
  label: string;
  /** md-files/{folder} */
  folder: string;
}
