import { FormControl } from '@angular/forms';

export const DEFAULT_CONFIG: GameConfig = {
  boardSize: 4,
  numWells: 3,
  numArrows: 1,
};

export interface GameConfig {
  boardSize: number;
  numWells: number;
  numArrows: number;
}

/**
 * Uses a "Mapped Type" to transform each property of GameConfig
 * into a FormControl of the corresponding type.
 */
export type FormConfig = {
  [K in keyof GameConfig]: FormControl<GameConfig[K]>;
};
