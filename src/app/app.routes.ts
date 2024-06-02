import { Routes } from '@angular/router';
import { unsavedChangesGuard } from './view/utils/unsaved-changes.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./home/home.component')
  },
  {
    path: 'view',
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('./list/list.component')
      },
      {
        path: ':id',
        canDeactivate: [unsavedChangesGuard],
        loadComponent: () => import('./view/view.component')
      }
    ]
  },
  {
    path: 'preview',
    loadComponent: () => import('./preview/preview.component')
  },
  {
    path: 'imprint',
    loadComponent: () => import('./imprint/imprint.component')
  },
  {
    path: '**',
    redirectTo: ''
  }
];
