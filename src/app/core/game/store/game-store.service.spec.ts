import { TestBed } from '@angular/core/testing';
import { GameBoardService } from '../board/game-board.service';

import { INITIAL_STATE } from '../constants';
import { GameState, Position } from '../types';
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
        walls: []
      },
      player: {
        position: { x: 0, y: 0 },
        direction: 'NORTH',
        arrows: 3,
        isAlive: true,
        hasGold: false
      },
      gameStatus: 'PLAYING',
      wumpus: {
        position: { x: 0, y: 0 },
        alive: false,
      },
      gold: {
        position: { x: 0, y: 0 },
        collected: false
      },
      startPosition: { x: 0, y: 0 }
    };

    expect(
      service.updateFromAction({ newState: initialGameState, perceptions: ['BREEZE'], gameStatus: 'PLAYING' })
    ).toEqual([]);
  });

  fit('create a new board with the specified size and update the state', () => {
    const boardSize = 4;
    const mockBoard = {
      width: boardSize,
      height: boardSize,
      wells: [],
      cells: Array(boardSize).fill(Array(boardSize).fill('')),
      walls: []
    };
    gameBoardService.createBoard.mockReturnValue(mockBoard);

    service.updateBoard(boardSize);

    expect(service.state().board.cells.length).toBe(boardSize);
    expect(service.state().board.cells[0].length).toBe(boardSize);
    expect(gameBoardService.createBoard).toHaveBeenCalledWith(boardSize);
  });

  it('update player position while preserving other player properties', () => {
    const newPosition: Position = { x: 4, y: 3 };
    service.updatePlayerPosition(newPosition);

    expect(service.state().player.position).toEqual(newPosition);
    expect(service.state().player.arrows).toEqual(INITIAL_STATE.player.arrows);
  });

  it('create a new board using GameBoardService and verify the service call', () => {
    const mockBoard = {
      width: 5,
      height: 5,
      wells: [],
      cells: [
        ['.', 'w'],
        ['P', '.'],
      ],
      walls: [],
    };

    gameBoardService.createBoard.mockReturnValue(mockBoard);
    const boardSize = 5;
    service.updateBoard(boardSize);

    expect(gameBoardService.createBoard).toHaveBeenCalledWith(boardSize);
    expect(gameBoardService.createBoard).toHaveBeenCalledTimes(1);
  });
});
