import { Component } from '@angular/core';
import { Routes } from '@angular/router';

@Component({
  template: '',
})
class DummyComponent {}

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component')
  },
  {
    path: 'edit',
    component: DummyComponent,
  },
  {
    path: 'preview',
    component: DummyComponent,
  },
];
