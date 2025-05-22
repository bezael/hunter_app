import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GameStoreService } from '../game/state/game-store.service';
import { FormErrorComponent } from './components/form-error/form-error.component';
import { DEFAULT_CONFIG, FormConfig } from './form.model';

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [ReactiveFormsModule, FormErrorComponent],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss',
})
export class StartScreenComponent implements OnInit {
  configForm!: FormGroup<FormConfig>;

  private readonly _fb = inject(FormBuilder);
  private readonly _router = inject(Router);
  private readonly _store = inject(GameStoreService);

  ngOnInit(): void {
    this._initForm();
    this._store.resetGame();
  }

  startGame() {
    if (this.configForm.valid) {
      const config = this.configForm.getRawValue();
      this._store.updateArrows(config.numArrows);
      this._store.updateBoard(config.boardSize, config.numWells);
      this._router.navigate(['/game']);
    }
  }

  isFieldValid(field: string): boolean {
    return (this.configForm.get(field)?.invalid && this.configForm.get(field)?.touched) ?? false;
  }

  private _initForm(): void {
    this.configForm = this._fb.group<FormConfig>({
      boardSize: new FormControl(DEFAULT_CONFIG.boardSize, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(4), Validators.max(10)],
      }),
      numWells: new FormControl(DEFAULT_CONFIG.numWells, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(1)],
      }),
      numArrows: new FormControl(DEFAULT_CONFIG.numArrows, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(1)],
      }),
    });
  }
}
