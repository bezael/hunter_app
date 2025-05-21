import { TestBed } from '@angular/core/testing';
import { GameBoardService } from '../game-board.service';

describe('GameBoardService', () => {
  let service: GameBoardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameBoardService);
  });

  it('create an empty board with the specified size', () => {
    const boardSize = 5;
    const board = service.createBoard(boardSize);

    expect(board.length).toEqual(boardSize);
    expect(board[0].length).toEqual(boardSize);
    expect(board[1].length).toEqual(boardSize);
  });

  it('create a board with different sizes', () => {
    const sizes = [2, 3, 4, 5];

    sizes.forEach((size: number) => {
      const board = service.createBoard(size);

      expect(board.length).toEqual(size);
      expect(board[0].length).toEqual(size);
      expect(board[1].length).toEqual(size);
    });
  });
});
