import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { GameBoardComponent } from '@app/features/game/board/game-board.component';
import { StoreService } from '@app/shared/services/store/store.service';
import { render, screen } from '@testing-library/angular';

class MockStoreService {
  board = signal<string[][]>([]);
  player = signal<string>('');
  gameStatus = signal<string>('');

  setBoard(newBoard: string[][]) {
    this.board.set(newBoard);
  }
  setPlayer(newPlayer: string) {
    this.player.set(newPlayer);
  }
  setGameStatus(newStatus: string) {
    this.gameStatus.set(newStatus);
  }
}

const mockRouter = {
  navigate: jest.fn(),
};
describe('GameBoardComponent', () => {
  let mockStoreService: MockStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    mockStoreService = new MockStoreService();
  });

  it('render component and display initial board', async () => {
    const initialBoard = [
      ['', '', ''],
      ['', 'G', ''],
      ['', '', 'P'],
    ];

    mockStoreService.setBoard(initialBoard);

    await render(GameBoardComponent, {
      providers: [{ provide: StoreService, useValue: mockStoreService }],
    });

    const container = screen.getByTestId('game-board');
    expect(container).toBeInTheDocument();

    const rows = screen.getAllByTestId(/board-row-/i);
    expect(rows.length).toBe(3);

    const cells = screen.getAllByTestId(/board-cell-/i);
    expect(cells.length).toBe(9);
  });

  it('navigate to /start if board is empty', async () => {
    await render(GameBoardComponent, {
      providers: [{ provide: Router, useValue: mockRouter }],
    });
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/start']);
  });
});
