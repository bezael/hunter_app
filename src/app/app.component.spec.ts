import { render, screen } from '@testing-library/angular';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  it('render the title', async () => {
    await render(AppComponent, {
      componentProperties: { title: 'Testing title' },
    });
    const title = screen.getByRole('heading', { name: 'Hello, Testing title' });
    expect(title).toBeInTheDocument();
  });
});
