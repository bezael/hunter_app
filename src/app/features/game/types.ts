import { CARDINAL_POINTS, GAME_STATUS, PERCEPTIONS, SIDE } from './constants';

export type CardinalPoints = (typeof CARDINAL_POINTS)[keyof typeof CARDINAL_POINTS];
export type GameStatus = (typeof GAME_STATUS)[keyof typeof GAME_STATUS];
export type Perception = (typeof PERCEPTIONS)[keyof typeof PERCEPTIONS];
export type Side = (typeof SIDE)[keyof typeof SIDE];

export interface Position {
  x: number;
  y: number;
}

export interface Player {
  position: Position;
  cardinalPoint: CardinalPoints;
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
