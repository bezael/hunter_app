export interface Position {
  x: number;
  y: number;
}

export type Orientation = 'NORTH' | 'SOUTH' | 'EAST' | 'WEST';

export interface Player {
  position: Position;
  orientation: Orientation;
  arrows: number;
}

export type Status = 'PLAYING' | 'WON' | 'LOST';

export interface GameState {
  board: string[][];
  player: Player;
  gameStatus: Status;
}

export const INITIAL_STATE: GameState = {
  board: [],
  player: {
    position: { x: 0, y: 0 },
    orientation: 'NORTH',
    arrows: 3,
  },
  gameStatus: 'PLAYING',
};
