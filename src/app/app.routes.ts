import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component'),
  },
  {
    path: 'view',
    loadComponent: () => import('./view/view.component'),
  },
  {
    path: 'preview',
    loadComponent: () => import('./preview/preview.component'),
  },
];
