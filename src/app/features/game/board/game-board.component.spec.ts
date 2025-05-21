import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { INITIAL_STATE } from '@app/core/game/constants';
import { GameBoardComponent } from '@app/features/game/board/game-board.component';
import { GameStoreService } from '@core/game/store/game-store.service';
import { render, screen } from '@testing-library/angular';

const fakeInitialBoard = [
  ['', '', '', ''],
  ['', 'G', '', ''],
  ['', '', '', 'P'],
  ['', '', '', ''],
];

const mockGameStoreService = {
  state: jest.fn().mockReturnValue({
    ...INITIAL_STATE,
    board: [...fakeInitialBoard],
  }),
};

const mockRouter = {
  navigate: jest.fn(),
};

describe('GameBoardComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('render component and display initial board', async () => {
    await render(GameBoardComponent, {
      providers: [
        { provide: GameStoreService, useValue: mockGameStoreService },
        { provide: Router, useValue: mockRouter },
      ],
    });

    const container = screen.getByTestId('game-board');
    expect(container).toBeInTheDocument();

    const rows = screen.getAllByTestId(/board-row-/i);
    expect(rows.length).toBe(4);

    const cells = screen.getAllByTestId(/board-cell-/i);
    expect(cells.length).toBe(16);
  });

  it('navigate to /start if board is empty', async () => {
    const emptyBoardMock = {
      state: jest.fn().mockReturnValue({
        ...INITIAL_STATE,
      }),
    };

    await render(GameBoardComponent, {
      providers: [
        { provide: GameStoreService, useValue: emptyBoardMock },
        { provide: Router, useValue: mockRouter },
      ],
    });
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/start']);
  });
});
