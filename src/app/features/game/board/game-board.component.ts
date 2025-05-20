import { Component, computed, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from '@app/shared/services/store/store.service';

@Component({
  selector: 'app-game-board',
  imports: [],
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.scss',
})
export class GameBoardComponent implements OnInit {
  private readonly _store = inject(StoreService);
  private readonly _router = inject(Router);

  board = computed(() => this._store.board());
  player = computed(() => this._store.player());
  gameStatus = computed(() => this._store.gameStatus());

  ngOnInit() {
    if (!this._store.board()?.length) {
      this._router.navigate(['/start']);
    }
  }

  getCellClass(cell: string): string {
    const classes = ['cell'];

    if (cell === 'V') classes.push('visited');
    if (cell === 'B') classes.push('breeze');
    if (cell === 'S') classes.push('stench');
    if (cell === 'G') classes.push('gold');
    if (cell === 'P') classes.push('well');
    if (cell === 'W') classes.push('wumpus');

    return classes.join(' ');
  }

  getCellContent(cell: string): string {
    switch (cell) {
      case 'G':
        return '💰';
      case 'P':
        return '🕳️';
      case 'W':
        return '👾';
      case 'B':
        return '💨';
      case 'S':
        return '👃';
      default:
        return '';
    }
  }
}
