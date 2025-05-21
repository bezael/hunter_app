import { render, screen } from '@testing-library/angular';
import { FormErrorComponent } from './form-error.component';

describe('FormErrorComponent', () => {
  it('not show error message when show is false', async () => {
    await render(FormErrorComponent, {
      inputs: {
        show: false,
        message: 'Test error message',
        fieldId: 'test-field',
      },
    });

    const errorMessageAlert = screen.queryByRole('alert');
    expect(errorMessageAlert).not.toBeInTheDocument();
  });

  it('show error message when show is true', async () => {
    await render(FormErrorComponent, {
      inputs: {
        show: true,
        message: 'Test error message',
        fieldId: 'test-field',
      },
    });

    const errorMessageAlert = screen.getByRole('alert');
    expect(errorMessageAlert).toBeInTheDocument();
    expect(errorMessageAlert).toHaveTextContent('Test error message');
  });

  it('update error message when message input changes', async () => {
    const { fixture } = await render(FormErrorComponent, {
      inputs: {
        show: true,
        message: 'Initial error message',
        fieldId: 'test-field',
      },
    });
    const errorMessageAlert = screen.getByRole('alert');
    expect(errorMessageAlert).toHaveTextContent('Initial error message');

    fixture.componentRef.setInput('message', 'Updated error message');
    fixture.detectChanges();

    expect(errorMessageAlert).toHaveTextContent('Updated error message');
  });
});
