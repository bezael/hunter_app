import { render, screen } from '@testing-library/angular';
import { FormErrorComponent } from './form-error.component';

interface SetupConfig {
  show: boolean;
  message: string;
  fieldId: string;
}

const DEFAULT_CONFIG: SetupConfig = {
  show: false,
  message: 'Test error message',
  fieldId: 'test-field',
};

describe('FormErrorComponent', () => {
  it('not show error message when show is false', async () => {
    await setup();

    const errorMessageAlert = screen.queryByRole('alert');
    expect(errorMessageAlert).not.toBeInTheDocument();
  });

  it('show error message when show is true', async () => {
    await setup({ show: true });

    const errorMessageAlert = screen.getByRole('alert');
    expect(errorMessageAlert).toBeInTheDocument();
    expect(errorMessageAlert).toHaveTextContent('Test error message');
  });

  it('update error message when message input changes', async () => {
    const { fixture } = await setup({ show: true, message: 'Initial error message' });

    const errorMessageAlert = screen.getByRole('alert');
    expect(errorMessageAlert).toHaveTextContent('Initial error message');

    fixture.componentRef.setInput('message', 'Updated error message');
    fixture.detectChanges();

    expect(errorMessageAlert).toHaveTextContent('Updated error message');
  });

  const setup = async (config: Partial<SetupConfig> = {}) => {
    const mergedConfig = { ...DEFAULT_CONFIG, ...config };
    return await render(FormErrorComponent, {
      inputs: mergedConfig,
    });
  };
});
