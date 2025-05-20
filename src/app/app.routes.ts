import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'start',
    loadComponent: () => import('./features/start-screen/start-screen.component').then(m => m.StartScreenComponent),
  },
  {
    path: 'game',
    loadChildren: () => import('./features/game/game.routes'),
  },
  {
    path: '**',
    redirectTo: '/start',
    pathMatch: 'full',
  },
];
