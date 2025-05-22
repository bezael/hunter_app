import { Injectable } from '@angular/core';
import { ALL_DIRECTIONS } from '@core/game/constants';
import { BoardState, Direction, Position, Side } from '../types';

@Injectable({ providedIn: 'root' })
export class BoardLogicService {
  getNextPosition(pos: Position, dir: Direction): Position {
    switch (dir) {
      case 'NORTH':
        return { x: pos.x, y: pos.y - 1 };
      case 'SOUTH':
        return { x: pos.x, y: pos.y + 1 };
      case 'EAST':
        return { x: pos.x + 1, y: pos.y };
      case 'WEST':
        return { x: pos.x - 1, y: pos.y };
    }
  }

  rotate(current: Direction, turn: Side): Direction {
    const idx = ALL_DIRECTIONS.indexOf(current);
    if (idx === -1) {
      throw new Error(`Invalid current direction: ${current}`);
    }
    const offset = turn === 'RIGHT' ? 1 : -1;
    return ALL_DIRECTIONS[(idx + offset + ALL_DIRECTIONS.length) % ALL_DIRECTIONS.length];
  }

  isWall(pos: Position, board: BoardState): boolean {
    const isOutOfBoundsX = pos.x < 0 || pos.x >= board.width;
    const isOutOfBoundsY = pos.y < 0 || pos.y >= board.height;

    return isOutOfBoundsX || isOutOfBoundsY;
  }

  checkWumpusInLine(pos: Position, dir: Direction, wumpusPos: Position): boolean {
    const directionChecks = {
      NORTH: () => pos.x === wumpusPos.x && wumpusPos.y < pos.y,
      SOUTH: () => pos.x === wumpusPos.x && wumpusPos.y > pos.y,
      EAST: () => pos.y === wumpusPos.y && wumpusPos.x > pos.x,
      WEST: () => pos.y === wumpusPos.y && wumpusPos.x < pos.x,
    };

    return directionChecks[dir]?.() || false;
  }
}
