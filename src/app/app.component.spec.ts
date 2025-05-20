import { Router } from '@angular/router';
import { render, screen } from '@testing-library/angular';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  it('should render the app container', async () => {
    const routerSpy = jest.fn();
    await render(AppComponent, {
      providers: [{ provide: Router, useValue: routerSpy }],
    });

    const container = screen.getByTestId('app-container');
    expect(container).toBeInTheDocument();
  });
});
