import { Component, computed, effect, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CARDINAL_POINTS } from '@core/utils/constants';
import { GameControlsComponent } from '../controls/game-controls.component';
import { GameStoreService } from '../state/game-store.service';

@Component({
  selector: 'app-game-board',
  imports: [GameControlsComponent],
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.scss',
})
export class GameBoardComponent {
  state = computed(() => this._store.state());

  private readonly _store = inject(GameStoreService);
  private readonly _router = inject(Router);

  constructor() {
    effect(() => {
      if (!this._store.state().board.cells.length) {
        this._router.navigate(['/start']);
      }
    });
  }

  getCellClass(cell: string, rowIndex: number, colIndex: number): string {
    const classes = ['cell'];
    const player = this.state().player;
    const isPlayerHere = player.position.x === colIndex && player.position.y === rowIndex;

    if (isPlayerHere) classes.push('player');
    if (cell === 'V') classes.push('visited');
    if (cell === 'B') classes.push('breeze');
    if (cell === 'S') classes.push('stench');
    if (cell === 'G') classes.push('gold');
    if (cell === 'P') classes.push('well');
    if (cell === 'W') classes.push('wumpus');

    return classes.join(' ');
  }

  getCellContent(cell: string, rowIndex: number, colIndex: number): string {
    const player = this.state().player;
    const isPlayerHere = player.position.x === colIndex && player.position.y === rowIndex;

    if (isPlayerHere) {
      switch (player.cardinalPoint) {
        case CARDINAL_POINTS.NORTH:
          return '⬆️';
        case CARDINAL_POINTS.SOUTH:
          return '⬇️';
        case CARDINAL_POINTS.EAST:
          return '➡️';
        case CARDINAL_POINTS.WEST:
          return '⬅️';
        default:
          return '';
      }
    }
    console.log('Cell value:', cell, 'at position:', { rowIndex, colIndex });

    return '';
  }
}
