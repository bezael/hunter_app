import { computed, inject, Injectable, signal } from '@angular/core';
import { GameBoardService } from '@app/core/game/board/game-board.service';
import { Direction, GameState, GameStatus, Position } from '@core/game/types';
import { INITIAL_STATE } from './store.model';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  readonly board = computed(() => this.state().board);
  readonly player = computed(() => this.state().player);
  readonly gameStatus = computed(() => this.state().gameStatus);

  private readonly state = signal<GameState>(INITIAL_STATE);
  private readonly _gameBoardService = inject(GameBoardService);

  updateBoard(boardSize: number) {
    const newBoard = this._gameBoardService.createBoard(boardSize);
    this.state.update(state => ({ ...state, board: newBoard }));
  }

  updatePlayerPosition(position: Position = { x: 0, y: 0 }) {
    this.state.update(state => ({
      ...state,
      player: { ...state.player, position },
    }));
  }

  updatePlayerOrientation(direction: Direction = 'NORTH') {
    this.state.update(state => ({
      ...state,
      player: { ...state.player, direction },
    }));
  }

  updateArrows(arrows: number) {
    this.state.update(state => ({
      ...state,
      player: { ...state.player, arrows },
    }));
  }

  updateGameStatus(status: GameStatus) {
    this.state.update(state => ({ ...state, gameStatus: status }));
  }

  resetGame() {
    this.state.set(INITIAL_STATE);
  }
}
