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
    board: {
      ...INITIAL_STATE.board,
      cells: [...fakeInitialBoard],
    },
  }),
  gameStatus: jest.fn().mockReturnValue('PLAYING'),
  currentPerceptions: jest.fn().mockReturnValue([]),
};

const mockRouter = {
  navigate: jest.fn(),
};

describe('GameBoardComponent', () => {
  it('render component and display initial board', async () => {
    await setup();

    const container = screen.getByTestId('game-board');
    expect(container).toBeInTheDocument();

    const rows = screen.getAllByTestId(/board-row-/i);
    expect(rows.length).toBe(4);

    const cells = screen.getAllByTestId(/board-cell-/i);
    expect(cells.length).toBe(16);
  });

  it('navigate to /start if board is empty', async () => {
    mockGameStoreService.state.mockReturnValue({
      ...INITIAL_STATE,
      board: {
        ...INITIAL_STATE.board,
        cells: [],
      },
    });

    await setup();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/start']);
  });

  const setup = async () => {
    return await render(GameBoardComponent, {
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: GameStoreService, useValue: mockGameStoreService },
      ],
    });
  };
});
