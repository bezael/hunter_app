import { Direction, GameState } from './types';
export const ALL_DIRECTIONS: Direction[] = ['NORTH', 'EAST', 'SOUTH', 'WEST'];

export const INITIAL_STATE: GameState = {
  board: {
    width: 0,
    height: 0,
    wells: [],
    cells: [],
    walls: [],
  },
  player: {
    position: { x: 0, y: 0 },
    direction: 'NORTH',
    arrows: 3,
    isAlive: true,
    hasGold: false,
  },
  wumpus: {
    position: { x: 0, y: 0 },
    alive: false,
  },
  gold: {
    position: { x: 0, y: 0 },
    collected: false,
  },
  startPosition: { x: 0, y: 0 },
  gameStatus: 'PLAYING',
};
