import { Injectable } from '@angular/core';

import { CARDINAL_POINTS, PERCEPTIONS } from '../constants';
import { CardinalPoints, GameState, Perception, Position } from '../types';

@Injectable({
  providedIn: 'root',
})
export class GamePerceptionService {
  getPerceptions(state: GameState): Perception[] {
    if (!state || !state.player || !state.board || !state.wumpus || !state.gold) {
      return [];
    }

    const perceptions: Perception[] = [];
    const { player, board, wumpus, gold } = state;

    if (wumpus.alive && this.isSamePosition(player.position, wumpus.position)) {
      perceptions.push(PERCEPTIONS.WUMPUS);
    }

    if (this.isAdjacentToPosition(player.position, wumpus.position, board)) {
      perceptions.push(PERCEPTIONS.STENCH);
    }

    if (this.isAdjacentToAnyPosition(player.position, board.wells, board)) {
      perceptions.push(PERCEPTIONS.BREEZE);
    }

    if (!gold.collected && this.isSamePosition(player.position, gold.position)) {
      perceptions.push(PERCEPTIONS.GLIMMER);
    }

    return perceptions;
  }

  private isSamePosition(pos1: Position, pos2: Position): boolean {
    return pos1.x === pos2.x && pos1.y === pos2.y;
  }

  private isAdjacentToPosition(playerPos: Position, targetPos: Position, board: GameState['board']): boolean {
    if (!targetPos) return false;
    return this.isAdjacentToAnyPosition(playerPos, [targetPos], board);
  }

  private isAdjacentToAnyPosition(playerPos: Position, targetPositions: Position[], board: GameState['board']): boolean {
    const adjacentCaves = this.getAdjacentCaves(playerPos, board);
    return targetPositions.some(target => 
      adjacentCaves.some(cave => this.isSamePosition(cave, target))
    );
  }

  private getAdjacentCaves(position: Position, board: GameState['board']): Position[] {
    const { x, y } = position;
    const adjacent: Position[] = [];
    const connections = board.cells[y][x].split(',') as CardinalPoints[];

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
}
