import { computed, inject, Injectable, signal } from '@angular/core';
import { GameBoardService } from '@app/core/game/board/game-board.service';
import { INITIAL_STATE } from '../constants';
import { GameActionResult, GameState, GameStatus, Perception } from '../types';

@Injectable({
  providedIn: 'root',
})
export class GameStoreService {
  readonly state = computed(() => this._state());
  readonly gameStatus = computed(() => this._status());
  readonly currentPerceptions = computed(() => this._perceptions());

  private readonly _state = signal<GameState>(INITIAL_STATE);
  private readonly _status = signal<GameStatus>('PLAYING');
  private readonly _perceptions = signal<Perception[]>([]);

  private readonly _gameBoardService = inject(GameBoardService);

  updateFromAction(result: GameActionResult) {
    const { newState, perceptions, gameStatus } = result;
    this._state.set(newState);
    this._perceptions.set(perceptions);
    this._status.set(gameStatus);
  }

  updateBoard(boardSize: number, numWells: number) {
    const newBoard = this._gameBoardService.createBoard(boardSize, numWells);
    this._state.update(state => ({ ...state, board: newBoard }));
  }

  updateArrows(arrows: number) {
    this._state.update(state => ({
      ...state,
      player: { ...state.player, arrows },
    }));
  }

  resetGame() {
    this._state.set(INITIAL_STATE);
    this._perceptions.set([]);
    this._status.set('PLAYING');
  }
}
