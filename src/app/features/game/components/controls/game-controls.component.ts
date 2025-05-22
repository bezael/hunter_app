import { Component, computed, inject } from '@angular/core';
import { GameFacadeService } from '../facade/game-facade.service';
import { GameStoreService } from '../state/game-store.service';

@Component({
  selector: 'app-game-controls',
  templateUrl: './game-controls.component.html',
  styleUrl: './game-controls.component.scss',
})
export class GameControlsComponent {
  status = computed(() => this._gameStoreService.gameStatus());
  perceptions = computed(() => this._gameStoreService.currentPerceptions());
  remainingShots = computed(() => this._gameStoreService.state().player.arrows);

  private readonly _gameStoreService = inject(GameStoreService);
  private readonly _gameFacadeService = inject(GameFacadeService);

  move() {
    this._gameFacadeService.move();
  }

  shoot() {
    this._gameFacadeService.shoot();
  }

  turnLeft() {
    this._gameFacadeService.turn('LEFT');
  }

  turnRight() {
    this._gameFacadeService.turn('RIGHT');
  }
}
