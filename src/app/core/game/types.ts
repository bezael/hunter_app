export type Direction = 'NORTH' | 'SOUTH' | 'EAST' | 'WEST';
export type GameStatus = 'PLAYING' | 'WON' | 'LOST';
export type Perception = 'STENCH' | 'BREEZE' | 'GLIMMER' | 'SCREAM' | 'BUMP';
export type Side = 'LEFT' | 'RIGHT';

export interface Position {
  x: number;
  y: number;
}

export interface Player {
  position: Position;
  direction: Direction;
  arrows: number;
  isAlive: boolean;
  hasGold: boolean;
}

export interface GoldState {
  position: Position;
  collected: boolean;
}

export interface BoardState {
  width: number;
  height: number;
  wells: Position[];
  walls?: Position[];
  cells: string[][];
}

export interface WumpusState {
  position: Position;
  alive: boolean;
}

export interface GameState {
  board: BoardState;
  player: Player;
  wumpus: WumpusState;
  gold: GoldState;
  startPosition: Position;
  gameStatus: GameStatus;
}

export interface GameActionResult {
  newState: GameState;
  perceptions: Perception[];
  gameStatus: GameStatus;
}
