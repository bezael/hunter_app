import { Router } from '@angular/router';
import { StartScreenComponent } from '@app/features/start-screen/start-screen.component';
import { GameStoreService } from '@core/game/store/game-store.service';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';

class MockStoreService {
  resetGame = jest.fn();
  updateArrows = jest.fn();
  updateBoard = jest.fn();
}

const mockRouter = {
  navigate: jest.fn(),
};

describe('StartScreenComponent', () => {
  let mockStoreService: MockStoreService;

  beforeEach(() => {
    mockStoreService = new MockStoreService();
  });

  it('initialize form with default values', async () => {
    const user = userEvent.setup();

    await render(StartScreenComponent);

    const inputBoardSize = screen.getByLabelText('Board size (n x n):');
    user.type(inputBoardSize, '4');

    const inputNumWells = screen.getByLabelText('Number of wells:');
    user.type(inputNumWells, '3');

    const inputNumArrows = screen.getByLabelText('Number of arrows:');
    user.type(inputNumArrows, '1');

    const startGameButton = screen.getByRole('button', { name: /start game/i });

    expect(screen.getByRole('heading', { name: /hunt the wumpus/i })).toBeInTheDocument();
    expect(startGameButton).toBeEnabled();
  });

  it('disable start button when form is invalid', async () => {
    const user = userEvent.setup();
    await render(StartScreenComponent);

    const inputBoardSize = screen.getByLabelText('Board size (n x n):');
    await user.type(inputBoardSize, '4');

    const inputNumWells = screen.getByLabelText('Number of wells:');
    await user.type(inputNumWells, '0');

    const inputNumArrows = screen.getByLabelText('Number of arrows:');
    await user.type(inputNumArrows, '1');

    const startGameButton = screen.getByRole('button', { name: /start game/i });

    expect(startGameButton).toBeDisabled();
  });

  it('navigate to game when form is valid', async () => {
    const user = userEvent.setup();

    await render(StartScreenComponent, {
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: GameStoreService, useValue: mockStoreService },
      ],
    });

    const startGameButton = screen.getByRole('button', { name: /start game/i });
    await user.click(startGameButton);

    expect(mockStoreService.updateBoard).toHaveBeenCalledWith(4);
    expect(mockStoreService.updateArrows).toHaveBeenCalledWith(1);

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/game']);
  });
});
