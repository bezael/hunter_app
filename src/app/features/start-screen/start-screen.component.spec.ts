import { Router } from '@angular/router';
import { GameStoreService } from '@features/game/state/game-store.service';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { StartScreenComponent } from './start-screen.component';

const mockGameStoreService = {
  resetGame: jest.fn(),
  updateArrows: jest.fn(),
  updateBoard: jest.fn(),
};

const mockRouter = {
  navigate: jest.fn(),
};

describe('StartScreenComponent', () => {
  it('initialize form with default values', async () => {
    const user = userEvent.setup();
    await setup();

    const inputBoardSize = screen.getByLabelText('Board size (n x n):');
    await user.clear(inputBoardSize);
    await user.type(inputBoardSize, '4');

    const inputNumWells = screen.getByLabelText('Number of wells:');
    await user.clear(inputNumWells);
    await user.type(inputNumWells, '3');

    const inputNumArrows = screen.getByLabelText('Number of arrows:');
    await user.clear(inputNumArrows);
    await user.type(inputNumArrows, '1');

    const startGameButton = screen.getByRole('button', { name: /start game/i });

    expect(screen.getByRole('heading', { name: /hunt the wumpus/i })).toBeInTheDocument();
    expect(startGameButton).toBeEnabled();
  });

  it('disable start button when form is invalid', async () => {
    const user = userEvent.setup();
    await setup();

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
    await setup();

    const startGameButton = screen.getByRole('button', { name: /start game/i });
    await user.click(startGameButton);

    expect(mockGameStoreService.updateBoard).toHaveBeenCalledWith(4, 3);
    expect(mockGameStoreService.updateArrows).toHaveBeenCalledWith(1);

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/game']);
  });

  const setup = async () => {
    return await render(StartScreenComponent, {
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: GameStoreService, useValue: mockGameStoreService },
      ],
    });
  };
});
