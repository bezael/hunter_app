import { inject, Injectable } from '@angular/core';
import { GAME_STATUS } from '../constants';
import { GameEngineService } from '../engine/game-engine.service';
import { GameStoreService } from '../store/game-store.service';
import { Side } from '../types';

@Injectable({ providedIn: 'root' })
export class GameFacadeService {
  private readonly _gameEngineService = inject(GameEngineService);
  private readonly _gameStoreService = inject(GameStoreService);

  readonly state = this._gameStoreService.state;
  readonly status = this._gameStoreService.gameStatus;
  readonly perceptions = this._gameStoreService.currentPerceptions;

  move() {
    const result = this._gameEngineService.move(this.state());
    this._gameStoreService.updateFromAction(result);
  }

  turn(side: Side) {
    const result = this._gameEngineService.turn(this.state(), side);
    this._gameStoreService.updateFromAction(result);
  }

  shoot() {
    const result = this._gameEngineService.shoot(this.state());
    this._gameStoreService.updateFromAction(result);
  }

  exit() {
    const { player, startPosition } = this.state();

    if (
      player.position.x === startPosition.x &&
      player.position.y === startPosition.y &&
      player.hasGold
    ) {
      this._gameStoreService.updateFromAction({
        newState: { ...this.state(), gameStatus: GAME_STATUS.WON },
        perceptions: [],
        gameStatus: GAME_STATUS.WON
      });
    }
  }
}
