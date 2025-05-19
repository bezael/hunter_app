import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'start',
    pathMatch: 'full',
  },
  {
    path: 'start',
    loadComponent: () => import('./features/start-screen/start-screen.component').then(m => m.StartScreenComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
