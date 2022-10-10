import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import store from '../../store/index';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import LoginForm from './LoginForm';
import { act } from 'react-dom/test-utils';

afterEach(cleanup);

describe('LoginForm component', () => {
  const queryClient = new QueryClient();
  test('handles input verification', async () => {
    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>
            <LoginForm act="Sign in" />
          </MemoryRouter>
        </QueryClientProvider>
      </Provider>
    );
    await act(async () => {
      fireEvent.change(screen.getByRole('textbox', { name: 'Email' }), {
        target: { value: 'exampletest.com' }
      });
      fireEvent.blur(screen.getByRole('textbox', { name: 'Email' }));
      fireEvent.change(document.querySelector('input[name="password"]')!, {
        target: { value: 'Example' }
      });
      fireEvent.blur(document.querySelector('input[name="password"]')!);
    });
    expect(screen.getByText('Not valid email!')).toBeDefined();
    expect(screen.getByText('Not valid password!')).toBeDefined();
    await act(async () => {
      fireEvent.change(screen.getByRole('textbox', { name: 'Email' }), {
        target: { value: 'example@test.com' }
      });
      fireEvent.blur(screen.getByRole('textbox', { name: 'Email' }));
      fireEvent.change(document.querySelector('input[name="password"]')!, {
        target: { value: 'Example123' }
      });
      fireEvent.blur(document.querySelector('input[name="password"]')!);
    });
    expect(screen.queryByText('Not valid email!')).toBeNull();
    expect(screen.queryByText('Not valid password!')).toBeNull();
  });
  test('clears input fields after signing in', async () => {
    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>
            <LoginForm act="Sign in" />
          </MemoryRouter>
        </QueryClientProvider>
      </Provider>
    );
    await act(async () => {
      fireEvent.change(screen.getByRole('textbox', { name: 'Email' }), {
        target: { value: 'example@test.com' }
      });

      fireEvent.change(document.querySelector('input[name="password"]')!, {
        target: { value: 'Example123' }
      });
    });
    await act(async () => {
      fireEvent.blur(screen.getByRole('textbox', { name: 'Email' }));
      fireEvent.blur(document.querySelector('input[name="password"]')!);
    });
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Sign in' }));
    });
    expect(screen.getByRole('textbox', { name: 'Email' })).toHaveProperty(
      'value',
      ''
    );
    expect(screen.getByRole('textbox', { name: 'Email' })).toHaveProperty(
      'value',
      ''
    );
  });
});
