import { TestBed } from '@angular/core/testing';
import { CARDINAL_POINTS, GAME_STATUS } from '@app/core/game/constants';
import { GameState } from '../types';
import { GameEvaluatorService } from './game-evaluator.service';

describe('GameEvaluatorService', () => {
  let service: GameEvaluatorService;

  beforeEach(() => {
    service = TestBed.inject(GameEvaluatorService);
  });

  it('return LOST when player is not alive', () => {
    const gameState: GameState = {
      player: {
        position: { x: 1, y: 1 },
        isAlive: false,
        hasGold: false,
        cardinalPoint: CARDINAL_POINTS.NORTH,
        arrows: 1,
      },
      wumpus: {
        position: { x: 2, y: 2 },
        alive: true,
      },
      gold: {
        position: { x: 3, y: 3 },
        collected: false,
      },
      board: {
        width: 4,
        height: 4,
        wells: [],
        cells: Array(4).fill(Array(4).fill('')),
        walls: [],
      },
      startPosition: { x: 0, y: 0 },
      gameStatus: GAME_STATUS.PLAYING,
    };

    const result = service.evaluateState(gameState);
    expect(result).toBe(GAME_STATUS.LOST);
  });
});
