import { computed } from '@angular/core';
import { INITIAL_STATE } from '@app/core/game/constants';
import { GameFacadeService } from '@app/core/game/services/game-facade.service';
import { GameStoreService } from '@app/core/game/store/game-store.service';
import { GameState, GameStatus, Perception } from '@app/core/game/types';
import { fireEvent, render, screen } from '@testing-library/angular';
import { GameControlsComponent } from './game-controls.component';

const fakeInitialBoard = [
  ['', '', '', ''],
  ['', 'G', '', ''],
  ['', '', '', 'P'],
  ['', '', '', ''],
];

const mockGameStoreService = (status: GameStatus = 'PLAYING') => ({
  state: jest.fn().mockReturnValue({
    ...INITIAL_STATE,
    board: {
      ...INITIAL_STATE.board,
      cells: [...fakeInitialBoard],
    },
  }),
  gameStatus: jest.fn().mockImplementation(() => status),
  currentPerceptions: jest.fn().mockReturnValue([]),
});

const mockGameFacadeService = {
  move: jest.fn(),
  shoot: jest.fn(),
  turn: jest.fn(),
  startNewGame: jest.fn(),
  state: computed(() => ({}) as GameState),
  status: computed(() => 'PLAYING' as GameStatus),
  perceptions: computed(() => [] as Perception[]),
};

describe('GameControlsComponent', () => {
  describe('Status Display', () => {
    it('show won message when status is WON', async () => {
      await setup('WON');
      const message = await screen.findByText(/You won! You collected the gold and returned safely/i);
      expect(message).toBeInTheDocument();
      expect(message).toHaveClass('won');
    });

    it('show lost message when status is LOST', async () => {
      await setup('LOST');
      const message = await screen.findByText(/You died! The Wumpus or a pit got you/i);
      expect(message).toBeInTheDocument();
      expect(message).toHaveClass('lost');
    });

    it('show controls when status is PLAYING', async () => {
      await setup();
      expect(screen.getByRole('button', { name: /move/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /turn left/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /turn right/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /shoot/i })).toBeInTheDocument();
    });
  });

  describe('Button Interactions', () => {
    it('call move when move button is clicked', async () => {
      await setup();
      const moveButton = screen.getByRole('button', { name: /move/i });
      await fireEvent.click(moveButton);
      expect(mockGameFacadeService.move).toHaveBeenCalledTimes(1);
    });

    it('call turn left when turn left button is clicked', async () => {
      await setup();
      const turnLeftButton = screen.getByRole('button', { name: /turn left/i });
      await fireEvent.click(turnLeftButton);
      expect(mockGameFacadeService.turn).toHaveBeenCalledWith('LEFT');
    });

    it('call turn right when turn right button is clicked', async () => {
      await setup();
      const turnRightButton = screen.getByRole('button', { name: /turn right/i });
      await fireEvent.click(turnRightButton);
      expect(mockGameFacadeService.turn).toHaveBeenCalledWith('RIGHT');
    });

    it('call shoot when shoot button is clicked', async () => {
      await setup();
      const shootButton = screen.getByRole('button', { name: /shoot/i });
      await fireEvent.click(shootButton);
      expect(mockGameFacadeService.shoot).toHaveBeenCalledTimes(1);
    });
  });

  const setup = async (status: GameStatus = 'PLAYING') => {
    const mockGameStore = mockGameStoreService(status);
    return await render(GameControlsComponent, {
      providers: [
        { provide: GameFacadeService, useValue: mockGameFacadeService },
        { provide: GameStoreService, useValue: mockGameStore },
      ],
    });
  };
});
