import { TestBed } from '@angular/core/testing';
import { BoardLogicService } from './board-logic.service';

describe('BoardLogicService', () => {
  let service: BoardLogicService;

  beforeEach(() => {
    service = TestBed.inject(BoardLogicService);
  });

  describe('getNextPosition', () => {
    it('move north', () => {
      const pos = service.getNextPosition({ x: 2, y: 2 }, 'NORTH');
      expect(pos).toEqual({ x: 2, y: 1 });
    });

    it('move east', () => {
      const pos = service.getNextPosition({ x: 2, y: 2 }, 'EAST');
      expect(pos).toEqual({ x: 3, y: 2 });
    });
  });

  describe('rotate', () => {
    it('left from north to west', () => {
      expect(service.rotate('NORTH', 'LEFT')).toBe('WEST');
    });

    it('full cycle to south from east turning right', () => {
      expect(service.rotate('EAST', 'RIGHT')).toBe('SOUTH');
    });
  });
});
