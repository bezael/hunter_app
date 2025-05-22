import { Injectable } from '@angular/core';
import { CARDINAL_POINTS } from '@app/core/game/constants';
import { BoardState, CardinalPoints, Position, Side } from '../types';

@Injectable({ providedIn: 'root' })
export class BoardLogicService {
  private readonly directions = [
    CARDINAL_POINTS.NORTH,
    CARDINAL_POINTS.EAST,
    CARDINAL_POINTS.SOUTH,
    CARDINAL_POINTS.WEST,
  ];

  getNextPosition(pos: Position, cardinalPoint: CardinalPoints): Position {
    switch (cardinalPoint) {
      case CARDINAL_POINTS.NORTH:
        return { x: pos.x, y: pos.y - 1 };
      case CARDINAL_POINTS.SOUTH:
        return { x: pos.x, y: pos.y + 1 };
      case CARDINAL_POINTS.EAST:
        return { x: pos.x + 1, y: pos.y };
      case CARDINAL_POINTS.WEST:
        return { x: pos.x - 1, y: pos.y };
    }
  }

  rotate(current: CardinalPoints, turn: Side): CardinalPoints {
    const idx = this.directions.indexOf(current);
    if (idx === -1) {
      throw new Error(`Invalid current direction: ${current}`);
    }
    const offset = turn === 'RIGHT' ? 1 : -1;
    return this.directions[(idx + offset + this.directions.length) % this.directions.length];
  }

  isWall(pos: Position, board: BoardState): boolean {
    const isOutOfBoundsX = pos.x < 0 || pos.x >= board.width;
    const isOutOfBoundsY = pos.y < 0 || pos.y >= board.height;

    return isOutOfBoundsX || isOutOfBoundsY;
  }

  checkWumpusInLine(pos: Position, cardinalPoint: CardinalPoints, wumpusPos: Position): boolean {
    const directionChecks = {
      NORTH: () => pos.x === wumpusPos.x && wumpusPos.y < pos.y,
      SOUTH: () => pos.x === wumpusPos.x && wumpusPos.y > pos.y,
      EAST: () => pos.y === wumpusPos.y && wumpusPos.x > pos.x,
      WEST: () => pos.y === wumpusPos.y && wumpusPos.x < pos.x,
    };

    return directionChecks[cardinalPoint]?.() || false;
  }
}
