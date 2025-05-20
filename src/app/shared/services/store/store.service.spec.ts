import { TestBed } from '@angular/core/testing';
import { GameBoardService } from '@shared/services/game-board/game-board.service';
import { INITIAL_STATE, Position } from '@shared/services/store/store.model';
import { StoreService } from './store.service';

const mockGameBoardService = {
  createBoard: jest.fn(),
};

describe('StoreService', () => {
  let service: StoreService;
  let gameBoardService: jest.Mocked<GameBoardService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: GameBoardService, useValue: mockGameBoardService }],
    });
    service = TestBed.inject(StoreService);
    gameBoardService = TestBed.inject(GameBoardService) as jest.Mocked<GameBoardService>;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('initialize game state with default values', () => {
    const initialPlayer = {
      position: { x: 0, y: 0 },
      orientation: 'NORTH',
      arrows: 3,
    };
    expect(service.board()).toEqual([]);
    expect(service.player()).toEqual(initialPlayer);
    expect(service.gameStatus()).toBe('PLAYING');
  });

  it('create a new board with the specified size and update the state', () => {
    const boardSize = 4;
    const mockBoard = Array(boardSize).fill(Array(boardSize).fill(''));
    gameBoardService.createBoard.mockReturnValue(mockBoard);

    service.updateBoard(boardSize);

    expect(service.board().length).toBe(boardSize);
    expect(service.board()[0].length).toBe(boardSize);
    expect(gameBoardService.createBoard).toHaveBeenCalledWith(boardSize);
  });

  it('update player position while preserving other player properties', () => {
    const newPosition: Position = { x: 4, y: 3 };
    service.updatePlayerPosition(newPosition);

    expect(service.player().position).toEqual(newPosition);
    expect(service.player().arrows).toEqual(INITIAL_STATE.player.arrows);
  });

  it('create a new board using GameBoardService and verify the service call', () => {
    const mockBoard = [
      ['.', 'w'],
      ['P', '.'],
    ];

    gameBoardService.createBoard.mockReturnValue(mockBoard);
    const boardSize = 5;
    service.updateBoard(boardSize);

    expect(gameBoardService.createBoard).toHaveBeenCalledWith(boardSize);
    expect(gameBoardService.createBoard).toHaveBeenCalledTimes(1);
  });
});
