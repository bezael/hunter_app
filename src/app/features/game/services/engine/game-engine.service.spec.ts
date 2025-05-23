import { TestBed } from '@angular/core/testing';
import { CARDINAL_POINTS, GAME_STATUS, PERCEPTIONS, SIDE } from '@core/utils/constants';
import { GameEvaluatorService } from '../evaluator/game-evaluator.service';
import { GamePerceptionService } from '../perception/game-perception.service';
import { BoardLogicService } from '../board/board-logic.service';
import { GameState } from '../../types';
import { GameEngineService } from './game-engine.service';

const initialGameState: GameState = {
  player: {
    position: { x: 1, y: 1 },
    cardinalPoint: CARDINAL_POINTS.NORTH,
    arrows: 1,
    isAlive: true,
    hasGold: false,
  },
  wumpus: {
    position: { x: 3, y: 3 },
    alive: true,
  },
  board: {
    width: 4,
    height: 4,
    wells: [{ x: 2, y: 2 }],
    cells: Array(4).fill(Array(4).fill('')),
  },
  gold: {
    position: { x: 3, y: 1 },
    collected: false,
  },
  startPosition: { x: 0, y: 0 },
  gameStatus: GAME_STATUS.PLAYING,
};

const mockBoardLogicService = {
  getNextPosition: jest.fn(),
  isWall: jest.fn(),
  rotate: jest.fn(),
  checkWumpusInLine: jest.fn(),
  directions: [CARDINAL_POINTS.NORTH, CARDINAL_POINTS.EAST, CARDINAL_POINTS.SOUTH, CARDINAL_POINTS.WEST],
} as unknown as jest.Mocked<BoardLogicService>;

const mockEvaluatorService = {
  checkWumpusEncounter: jest.fn(),
  checkWellFall: jest.fn(),
  checkGoldCollection: jest.fn(),
  evaluateState: jest.fn(),
};

const mockPerceptionService = {
  getPerceptions: jest.fn(),
  isSamePosition: jest.fn(),
  isAdjacentToPosition: jest.fn(),
  isAdjacentToAnyPosition: jest.fn(),
  getAdjacentCaves: jest.fn(),
};

describe('GameEngineService', () => {
  let service: GameEngineService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GameEngineService,
        { provide: BoardLogicService, useValue: mockBoardLogicService },
        { provide: GameEvaluatorService, useValue: mockEvaluatorService },
        { provide: GamePerceptionService, useValue: mockPerceptionService },
      ],
    });
    service = TestBed.inject(GameEngineService);
  });

  describe('move', () => {
    it('return bump perception when hitting a wall', () => {
      mockBoardLogicService.getNextPosition.mockReturnValue({ x: 1, y: 0 });
      mockBoardLogicService.isWall.mockReturnValue(true);

      const result = service.move(initialGameState);

      expect(result.perceptions).toContain(PERCEPTIONS.BUMP);
      expect(result.newState).toEqual(initialGameState);
    });

    it('move player and update state when no wall is hit', () => {
      const nextPosition = { x: 1, y: 1 };
      mockBoardLogicService.getNextPosition.mockReturnValue(nextPosition);
      mockBoardLogicService.isWall.mockReturnValue(false);
      mockEvaluatorService.checkWumpusEncounter.mockReturnValue(initialGameState);
      mockEvaluatorService.checkWellFall.mockReturnValue(initialGameState);
      mockEvaluatorService.checkGoldCollection.mockReturnValue(initialGameState);
      mockEvaluatorService.evaluateState.mockReturnValue(GAME_STATUS.PLAYING);
      mockPerceptionService.getPerceptions.mockReturnValue([PERCEPTIONS.STENCH]);

      const result = service.move(initialGameState);

      expect(result.newState.player.position).toEqual(nextPosition);
      expect(mockEvaluatorService.checkWumpusEncounter).toHaveBeenCalled();
      expect(mockEvaluatorService.checkWellFall).toHaveBeenCalled();
      expect(mockEvaluatorService.checkGoldCollection).toHaveBeenCalled();
    });
  });

  describe('turn', () => {
    it('turn player to the right', () => {
      mockBoardLogicService.rotate.mockReturnValue(CARDINAL_POINTS.EAST);
      mockEvaluatorService.evaluateState.mockReturnValue(GAME_STATUS.PLAYING);
      mockPerceptionService.getPerceptions.mockReturnValue([]);

      const result = service.turn(initialGameState, SIDE.RIGHT);

      expect(result.newState.player.cardinalPoint).toBe(CARDINAL_POINTS.EAST);
      expect(mockBoardLogicService.rotate).toHaveBeenCalledWith(CARDINAL_POINTS.NORTH, SIDE.RIGHT);
    });

    it('turn player to the left', () => {
      mockBoardLogicService.rotate.mockReturnValue(CARDINAL_POINTS.WEST);
      mockEvaluatorService.evaluateState.mockReturnValue(GAME_STATUS.PLAYING);
      mockPerceptionService.getPerceptions.mockReturnValue([]);

      const result = service.turn(initialGameState, SIDE.LEFT);

      expect(result.newState.player.cardinalPoint).toBe(CARDINAL_POINTS.WEST);
      expect(mockBoardLogicService.rotate).toHaveBeenCalledWith(CARDINAL_POINTS.NORTH, SIDE.LEFT);
    });
  });

  describe('shoot', () => {
    it('not shoot when player has no arrows', () => {
      const stateWithNoArrows = {
        ...initialGameState,
        player: { ...initialGameState.player, arrows: 0 },
      };

      const result = service.shoot(stateWithNoArrows);

      expect(result.newState).toEqual(stateWithNoArrows);
      expect(result.perceptions).toEqual([]);
    });

    it('hit wumpus and return SCREAM perception', () => {
      mockBoardLogicService.checkWumpusInLine.mockReturnValue(true);
      mockEvaluatorService.evaluateState.mockReturnValue(GAME_STATUS.PLAYING);

      const result = service.shoot(initialGameState);

      expect(result.newState.player.arrows).toBe(0);
      expect(result.newState.wumpus.alive).toBeFalsy();
      expect(result.perceptions).toContain('SCREAM');
    });

    it('miss wumpus and not return SCREAM perception', () => {
      mockBoardLogicService.checkWumpusInLine.mockReturnValue(false);
      mockEvaluatorService.evaluateState.mockReturnValue(GAME_STATUS.PLAYING);

      const result = service.shoot(initialGameState);

      expect(result.newState.player.arrows).toBe(0);
      expect(result.newState.wumpus.alive).toBeTruthy();
      expect(result.perceptions).toEqual([]);
    });
  });
});
