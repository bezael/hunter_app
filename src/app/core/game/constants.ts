import { GameState } from './types';

export const INITIAL_STATE: GameState = {
  board: [],
  player: {
    position: { x: 0, y: 0 },
    direction: 'NORTH',
    arrows: 3,
    isAlive: true,
  },
  wumpus: {
    position: { x: 0, y: 0 },
    alive: false,
  },
  gameStatus: 'PLAYING',
};
