import { Routes } from '@angular/router';

const GameRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./board/game-board.component').then(m => m.GameBoardComponent),
  },
];

export default GameRoutes;
