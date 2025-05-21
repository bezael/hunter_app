import { Injectable } from '@angular/core';
import { BoardState } from '../types';

@Injectable({ providedIn: 'root' })
export class GameBoardService {
  createBoard(boardSize: number): BoardState {
    const cells: string[][] = Array(boardSize)
      .fill(null)
      .map(() => Array(boardSize).fill(''));

    return {
      width: boardSize,
      height: boardSize,
      wells: [],
      walls: [],
      cells,
    };
  }
}
