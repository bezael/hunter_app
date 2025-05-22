import { Injectable } from '@angular/core';
import { GAME_STATUS } from '@app/core/game/constants';
import { GameState, GameStatus } from '../types';

@Injectable({
  providedIn: 'root',
})
export class GameEvaluatorService {
  evaluateState(state: GameState): GameStatus {
    const { player, wumpus, startPosition } = state;

    if (!player.isAlive) {
      return GAME_STATUS.LOST;
    }

    if (player.hasGold && 
        player.position.x === startPosition.x && 
        player.position.y === startPosition.y) {
      return GAME_STATUS.WON;
    }

    if (!wumpus.alive && player.hasGold) {
      return GAME_STATUS.WON;
    }

    return GAME_STATUS.PLAYING;
  }

  checkGoldCollection(state: GameState): GameState {
    const { player, gold } = state;
    
    if (!gold.collected && 
        player.position.x === gold.position.x && 
        player.position.y === gold.position.y) {
      return {
        ...state,
        gold: { ...gold, collected: true },
        player: { ...player, hasGold: true },
      };
    }

    return state;
  }

  checkWumpusEncounter(state: GameState): GameState {
    const { player, wumpus } = state;
    
    if (wumpus.alive && 
        player.position.x === wumpus.position.x && 
        player.position.y === wumpus.position.y) {
      return {
        ...state,
        player: { ...player, isAlive: false },
      };
    }

    return state;
  }

  checkWellFall(state: GameState): GameState {
    const { player, board } = state;
    
    const isInWell = board.wells.some(
      well => well.x === player.position.x && well.y === player.position.y
    );

    if (isInWell) {
      return {
        ...state,
        player: { ...player, isAlive: false },
      };
    }

    return state;
  }
}
