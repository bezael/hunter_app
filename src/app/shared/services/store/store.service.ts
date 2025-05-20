import { computed, inject, Injectable, signal } from '@angular/core';
import { GameBoardService } from '../game-board.service';
import { GameState, INITIAL_STATE, Orientation, Position, Status } from './store.model';

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

  updatePlayerOrientation(orientation: Orientation = 'NORTH') {
    this.state.update(state => ({
      ...state,
      player: { ...state.player, orientation },
    }));
  }

  updateArrows(arrows: number) {
    this.state.update(state => ({
      ...state,
      player: { ...state.player, arrows },
    }));
  }

  updateGameStatus(status: Status) {
    this.state.update(state => ({ ...state, gameStatus: status }));
  }

  resetGame() {
    this.state.set(INITIAL_STATE);
  }
}
