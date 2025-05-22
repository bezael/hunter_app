import { Injectable } from '@angular/core';
import { CARDINAL_POINTS } from '@core/utils/constants';
import { BoardState, Position } from '../../types';

@Injectable({ providedIn: 'root' })
export class GameBoardService {
  createBoard(boardSize: number, numWells: number): BoardState {
    const cells: string[][] = Array(boardSize)
      .fill(null)
      .map(() => Array(boardSize).fill(''));

    for (let y = 0; y < boardSize; y++) {
      for (let x = 0; x < boardSize; x++) {
        const connections: string[] = [];

        if (y > 0) connections.push(CARDINAL_POINTS.NORTH);
        if (y < boardSize - 1) connections.push(CARDINAL_POINTS.SOUTH);
        if (x > 0) connections.push(CARDINAL_POINTS.WEST);
        if (x < boardSize - 1) connections.push(CARDINAL_POINTS.EAST);

        cells[y][x] = connections.join(',');
      }
    }

    const wells = this._generateRandomPositions(boardSize, numWells);

    return {
      width: boardSize,
      height: boardSize,
      wells,
      cells,
      walls: [],
    };
  }

  getAdjacentCaves(position: Position, board: BoardState): Position[] {
    const { x, y } = position;
    const adjacent: Position[] = [];
    const connections = board.cells[y][x].split(',');

    if (connections.includes(CARDINAL_POINTS.NORTH) && y > 0) {
      adjacent.push({ x, y: y - 1 });
    }
    if (connections.includes(CARDINAL_POINTS.SOUTH) && y < board.height - 1) {
      adjacent.push({ x, y: y + 1 });
    }
    if (connections.includes(CARDINAL_POINTS.WEST) && x > 0) {
      adjacent.push({ x: x - 1, y });
    }
    if (connections.includes(CARDINAL_POINTS.EAST) && x < board.width - 1) {
      adjacent.push({ x: x + 1, y });
    }

    return adjacent;
  }

  private _generateRandomPosition(boardSize: number): Position {
    return {
      x: Math.floor(Math.random() * boardSize),
      y: Math.floor(Math.random() * boardSize),
    };
  }

  private _generateRandomPositions(boardSize: number, count: number): Position[] {
    const positions: Position[] = [];
    while (positions.length < count) {
      const pos = this._generateRandomPosition(boardSize);
      if (!positions.some(p => p.x === pos.x && p.y === pos.y) && !(pos.x === 0 && pos.y === 0)) {
        positions.push(pos);
      }
    }
    return positions;
  }
}
