import { inject, Injectable } from '@angular/core';
import { PERCEPTIONS } from '@app/core/game/constants';
import { BoardLogicService } from '@app/core/game/services/board-logic.service';
import { GameEvaluatorService } from '@core/game/evaluator/game-evaluator.service';
import { GamePerceptionService } from '@core/game/perception/game-perception.service';
import { GameActionResult, GameState, Perception, Side } from '../types';

@Injectable({
  providedIn: 'root',
})
export class GameEngineService {
  private readonly _boardLogicService = inject(BoardLogicService);
  private readonly _evaluatorService = inject(GameEvaluatorService);
  private readonly _perceptionService = inject(GamePerceptionService);

  move(state: GameState): GameActionResult {
    const { player, board } = state;
    const nextPosition = this._boardLogicService.getNextPosition(player.position, player.cardinalPoint);

    if (this._boardLogicService.isWall(nextPosition, board)) {
      return {
        newState: state,
        perceptions: [PERCEPTIONS.BUMP],
        gameStatus: state.gameStatus,
      };
    }

    const updatedPlayer = { ...player, position: nextPosition };
    let updatedState: GameState = { ...state, player: updatedPlayer };

    updatedState = this._evaluatorService.checkWumpusEncounter(updatedState);
    updatedState = this._evaluatorService.checkWellFall(updatedState);
    updatedState = this._evaluatorService.checkGoldCollection(updatedState);

    const perceptions = this._perceptionService.getPerceptions(updatedState);
    const status = this._evaluatorService.evaluateState(updatedState);

    return {
      newState: updatedState,
      perceptions,
      gameStatus: status,
    };
  }

  turn(state: GameState, side: Side): GameActionResult {
    const { player } = state;
    const newDirection = this._boardLogicService.rotate(player.cardinalPoint, side);

    const updatedState: GameState = {
      ...state,
      player: {
        ...player,
        cardinalPoint: newDirection,
      },
    };

    const perceptions = this._perceptionService.getPerceptions(updatedState);
    const status = this._evaluatorService.evaluateState(updatedState);

    return {
      newState: updatedState,
      perceptions,
      gameStatus: status,
    };
  }

  shoot(state: GameState): GameActionResult {
    const { player, wumpus } = state;
    
    if (player.arrows <= 0) {
      return {
        newState: state,
        perceptions: [],
        gameStatus: state.gameStatus,
      };
    }

    const hit = this._boardLogicService.checkWumpusInLine(player.position, player.cardinalPoint, wumpus.position);

    const updatedPlayer = {
      ...player,
      arrows: player.arrows - 1,
    };

    const updatedWumpus = {
      ...wumpus,
      alive: hit ? false : wumpus.alive,
    };

    const updatedState: GameState = {
      ...state,
      player: updatedPlayer,
      wumpus: updatedWumpus,
    };

    const perceptions: Perception[] = hit ? [PERCEPTIONS.SCREAM] : [];
    const status = this._evaluatorService.evaluateState(updatedState);

    return {
      newState: updatedState,
      perceptions,
      gameStatus: status,
    };
  }
}
