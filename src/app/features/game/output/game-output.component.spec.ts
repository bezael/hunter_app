import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameOutputComponent } from './game-output.component';

describe('GameOutputComponent', () => {
  let component: GameOutputComponent;
  let fixture: ComponentFixture<GameOutputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameOutputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
