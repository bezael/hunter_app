import { TestBed } from '@angular/core/testing';
import { CARDINAL_POINTS, SIDE } from '@app/core/game/constants';
import { BoardLogicService } from './board-logic.service';

describe('BoardLogicService', () => {
  let service: BoardLogicService;

  beforeEach(() => {
    service = TestBed.inject(BoardLogicService);
  });

  describe('getNextPosition', () => {
    it('move north', () => {
      const pos = service.getNextPosition({ x: 2, y: 2 }, CARDINAL_POINTS.NORTH);
      expect(pos).toEqual({ x: 2, y: 1 });
    });

    it('move east', () => {
      const pos = service.getNextPosition({ x: 2, y: 2 }, CARDINAL_POINTS.EAST);
      expect(pos).toEqual({ x: 3, y: 2 });
    });
  });

  describe('rotate', () => {
    it('left from north to west', () => {
      expect(service.rotate(CARDINAL_POINTS.NORTH, SIDE.LEFT)).toBe(CARDINAL_POINTS.WEST);
    });

    it('full cycle to south from east turning right', () => {
      expect(service.rotate(CARDINAL_POINTS.EAST, SIDE.RIGHT)).toBe(CARDINAL_POINTS.SOUTH);
    });
  });
});
