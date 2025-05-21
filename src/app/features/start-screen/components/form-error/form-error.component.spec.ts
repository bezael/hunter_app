import { render, screen } from '@testing-library/angular';
import { FormErrorComponent } from './form-error.component';

interface SetupConfig {
  show: boolean;
  message: string;
  fieldId: string;
}
describe('FormErrorComponent', () => {
  it('not show error message when show is false', async () => {
    const inputs = { show: false, message: 'Test error message', fieldId: 'test-field' };
    await setup(inputs);

    const errorMessageAlert = screen.queryByRole('alert');
    expect(errorMessageAlert).not.toBeInTheDocument();
  });

  it('show error message when show is true', async () => {
    const inputs = { show: true, message: 'Test error message', fieldId: 'test-field' };
    await setup(inputs);

    const errorMessageAlert = screen.getByRole('alert');
    expect(errorMessageAlert).toBeInTheDocument();
    expect(errorMessageAlert).toHaveTextContent('Test error message');
  });

  it('update error message when message input changes', async () => {
    const inputs = { show: true, message: 'Initial error message', fieldId: 'test-field' };
    const { fixture } = await setup(inputs);

    const errorMessageAlert = screen.getByRole('alert');
    expect(errorMessageAlert).toHaveTextContent('Initial error message');

    fixture.componentRef.setInput('message', 'Updated error message');
    fixture.detectChanges();

    expect(errorMessageAlert).toHaveTextContent('Updated error message');
  });

  const setup = async (config: SetupConfig) => {
    return await render(FormErrorComponent, {
      inputs: {
        ...config,
      },
    });
  };
});
