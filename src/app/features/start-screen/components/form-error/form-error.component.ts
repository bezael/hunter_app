import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-form-error',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (show()) {
      <div [id]="errorId()" class="error-message" role="alert">
        {{ message() }}
      </div>
    }
  `,
  styles: [`
    .error-message {
      color: var(--color-error);
      font-size: var(--font-size-sm);
      margin-top: var(--spacing-1);
    }
  `]
})
export class FormErrorComponent {
  show = input<boolean>(false);
  message = input<string>('');
  fieldId = input<string>('');
  
  errorId = computed(() => `${this.fieldId()}-error`);
} 
