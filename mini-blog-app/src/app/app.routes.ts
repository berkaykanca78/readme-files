import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
    title: 'Mini Blog',
  },
  {
    path: 'kategori/:category',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
    title: 'Mini Blog',
  },
  {
    path: 'post/:slug',
    loadComponent: () =>
      import('./pages/post-detail/post-detail.component').then((m) => m.PostDetailComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
