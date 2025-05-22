import { TestBed } from '@angular/core/testing';
import { CARDINAL_POINTS, GAME_STATUS, INITIAL_STATE } from '../constants';
import { GameEngineService } from '../engine/game-engine.service';
import { GameStoreService } from '../store/game-store.service';
import { GameActionResult, Side } from '../types';
import { GameFacadeService } from './game-facade.service';

const fakeState = {
  ...INITIAL_STATE,
  player: {
    position: { x: 0, y: 0 },
    cardinalPoint: CARDINAL_POINTS.NORTH,
    arrows: 3,
    isAlive: true,
    hasGold: false,
  },
  startPosition: { x: 0, y: 0 },
  gameStatus: GAME_STATUS.PLAYING,
};

const mockGameStoreService = {
  state: jest.fn().mockReturnValue(fakeState),
  updateFromAction: jest.fn(),
  gameStatus: jest.fn(),
  currentPerceptions: jest.fn(),
};

const mockGameEngineService = {
  move: jest.fn(),
  turn: jest.fn(),
  shoot: jest.fn(),
}; 

describe('GameFacadeService', () => {
  let service: GameFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GameFacadeService,
        { provide: GameEngineService, useValue: mockGameEngineService },
        { provide: GameStoreService, useValue: mockGameStoreService },
      ],
    });

    service = TestBed.inject(GameFacadeService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('move()', () => {
    it('call game engine move and update store', () => {
      const mockResult: GameActionResult = {
        newState: { ...fakeState },
        perceptions: ['BREEZE'],
        gameStatus: GAME_STATUS.PLAYING,
      };
      mockGameEngineService.move.mockReturnValue(mockResult);

      service.move();

      expect(mockGameEngineService.move).toHaveBeenCalledWith(fakeState);
      expect(mockGameStoreService.updateFromAction).toHaveBeenCalledWith(mockResult);
    });
  });

  describe('turn()', () => {
    it('call game engine turn and update store', () => {
      const side: Side = 'LEFT';
      const mockResult: GameActionResult = {
        newState: { ...fakeState },
        perceptions: [],
        gameStatus: GAME_STATUS.PLAYING,
      };
      mockGameEngineService.turn.mockReturnValue(mockResult);

      service.turn(side);

      expect(mockGameEngineService.turn).toHaveBeenCalledWith(fakeState, side);
      expect(mockGameStoreService.updateFromAction).toHaveBeenCalledWith(mockResult);
    });
  });

  describe('exit()', () => {
    it('not update game status when player does not have gold', () => {
      service.exit();
      expect(mockGameStoreService.updateFromAction).not.toHaveBeenCalled();
    });
  });
});
