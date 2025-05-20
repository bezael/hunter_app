import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GameBoardService {
  createBoard(boardSize: number): string[][] {
    const emptyBoard: string[][] = Array(boardSize)
      .fill(null)
      .map(() => Array(boardSize).fill(''));

    return emptyBoard;
  }
}
