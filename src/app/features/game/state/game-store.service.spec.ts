import { TestBed } from '@angular/core/testing';
import { CARDINAL_POINTS, GAME_STATUS, INITIAL_STATE, PERCEPTIONS } from '@core/utils/constants';
import { GameState, Position } from '../types';
import { GameBoardService } from '../services/board/game-board.service';
import { GameStoreService } from './game-store.service';

const mockGameBoardService = {
  createBoard: jest.fn(),
};

describe('GameStoreService', () => {
  let service: GameStoreService;
  let gameBoardService: jest.Mocked<GameBoardService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: GameBoardService, useValue: mockGameBoardService }],
    });
    service = TestBed.inject(GameStoreService);
    gameBoardService = TestBed.inject(GameBoardService) as jest.Mocked<GameBoardService>;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('initialize game state with default values', () => {
    const initialGameState: GameState = {
      board: {
        width: 0,
        height: 0,
        wells: [],
        cells: [],
        walls: [],
      },
      player: {
        position: { x: 0, y: 0 },
        cardinalPoint: CARDINAL_POINTS.NORTH,
        arrows: 3,
        isAlive: true,
        hasGold: false,
      },
      gameStatus: GAME_STATUS.PLAYING,
      wumpus: {
        position: { x: 0, y: 0 },
        alive: false,
      },
      gold: {
        position: { x: 0, y: 0 },
        collected: false,
      },
      startPosition: { x: 0, y: 0 },
    };

    service.updateFromAction({
      newState: initialGameState,
      perceptions: [PERCEPTIONS.BREEZE],
      gameStatus: GAME_STATUS.PLAYING,
    });
  });

  it('create a new board with the specified size and update the state', () => {
    const boardSize = 4;
    const mockBoard = {
      width: boardSize,
      height: boardSize,
      wells: [],
      cells: Array(boardSize).fill(Array(boardSize).fill('')),
      walls: [],
    };
    gameBoardService.createBoard.mockReturnValue(mockBoard);

    service.updateBoard(boardSize, 3);

    expect(service.state().board.cells.length).toBe(boardSize);
    expect(service.state().board.cells[0].length).toBe(boardSize);
    expect(gameBoardService.createBoard).toHaveBeenCalledWith(boardSize, 3);
  });

  it('update player position while preserving other player properties', () => {
    const newPosition: Position = { x: 4, y: 3 };
    service.updateFromAction({
      newState: { ...service.state(), player: { ...service.state().player, position: newPosition } },
      perceptions: [],
      gameStatus: GAME_STATUS.PLAYING,
    });

    expect(service.state().player.position).toEqual(newPosition);
    expect(service.state().player.arrows).toEqual(INITIAL_STATE.player.arrows);
  });

  it('create a new board using GameBoardService and verify the service call', () => {
    const mockBoard = {
      width: 5,
      height: 5,
      wells: [
        { x: 0, y: 0 },
        { x: 1, y: 1 },
        { x: 2, y: 2 },
      ],
      cells: [
        ['.', 'w'],
        ['P', '.'],
      ],
      walls: [],
    };

    gameBoardService.createBoard.mockReturnValue(mockBoard);
    const boardSize = 5;
    const numWells = 3;
    service.updateBoard(boardSize, numWells);

    expect(gameBoardService.createBoard).toHaveBeenCalledWith(boardSize, numWells);
    expect(gameBoardService.createBoard).toHaveBeenCalledTimes(1);
  });
});
