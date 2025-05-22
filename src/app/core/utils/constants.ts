import { GameState } from '@features/game/types';

export const CARDINAL_POINTS = {
  NORTH: 'NORTH',
  SOUTH: 'SOUTH',
  EAST: 'EAST',
  WEST: 'WEST',
} as const;

export const PERCEPTIONS = {
  STENCH: 'STENCH',
  BREEZE: 'BREEZE',
  GLIMMER: 'GLIMMER',
  SCREAM: 'SCREAM',
  BUMP: 'BUMP',
  WUMPUS: 'WUMPUS',
} as const;

export const SIDE = {
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
} as const;

export const GAME_STATUS = {
  PLAYING: 'PLAYING',
  WON: 'WON',
  LOST: 'LOST',
} as const;

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
    cardinalPoint: CARDINAL_POINTS.NORTH,
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
  gameStatus: GAME_STATUS.PLAYING,
} as const;
