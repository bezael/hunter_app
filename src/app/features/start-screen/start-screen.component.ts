import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormErrorComponent } from './components/form-error/form-error.component';
import { GameConfig } from './form.model';

export const DEFAULT_CONFIG: GameConfig = {
  boardSize: 4,
  numPits: 3,
  numArrows: 1,
};

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [ReactiveFormsModule, FormErrorComponent],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss',
})
export class StartScreenComponent implements OnInit {
  configForm!: FormGroup;

  private readonly _fb = inject(FormBuilder);
  private readonly _router = inject(Router);

  ngOnInit(): void {
    this._initForm();
  }

  startGame() {
    if (this.configForm.valid) {
      console.log(this.configForm.value);
      this._router.navigate(['/game']);
      // TODO: Guardar en el storage service la configuración 
    }
  }

  isFieldValid(field: string): boolean {
    return (this.configForm.get(field)?.invalid && this.configForm.get(field)?.touched) ?? false;
  }

  private _initForm(): void {
    this.configForm = this._fb.nonNullable.group({
      boardSize: [DEFAULT_CONFIG.boardSize, [Validators.required, Validators.min(4), Validators.max(10)]],
      numPits: [DEFAULT_CONFIG.numPits, [Validators.required, Validators.min(1)]],
      numArrows: [DEFAULT_CONFIG.numArrows, [Validators.required, Validators.min(1)]],
    });
  }
}
