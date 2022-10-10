import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import store from '../../store/index';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import SignUpForm from './SignUpForm';
import { act } from 'react-dom/test-utils';

afterEach(cleanup);

describe('SignUpForm component', () => {
  const queryClient = new QueryClient();
  test('handles input verification', async () => {
    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>
            <SignUpForm role="user" />
          </MemoryRouter>
        </QueryClientProvider>
      </Provider>
    );
    await act(async () => {
      fireEvent.change(screen.getByRole('textbox', { name: '' }), {
        target: { value: 'exampletest.com' }
      });
      fireEvent.blur(screen.getByRole('textbox', { name: '' }));
      fireEvent.change(document.querySelector('input[name="password"]')!, {
        target: { value: 'Example' }
      });
      fireEvent.blur(document.querySelector('input[name="password"]')!);
    });
    expect(screen.getByText('Invalid email!')).toBeDefined();
    expect(screen.getByText('Invalid password!')).toBeDefined();
    await act(async () => {
      fireEvent.change(screen.getByRole('textbox', { name: '' }), {
        target: { value: 'example@test.com' }
      });
      fireEvent.blur(screen.getByRole('textbox', { name: '' }));
      fireEvent.change(document.querySelector('input[name="password"]')!, {
        target: { value: 'Example123' }
      });
      fireEvent.blur(document.querySelector('input[name="password"]')!);
    });
    expect(screen.queryByText('Invalid email!')).toBeNull();
    expect(screen.queryByText('Invalid password!')).toBeNull();
  });
  test('clears input fields after signing in', async () => {
    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>
            <SignUpForm role="user" />
          </MemoryRouter>
        </QueryClientProvider>
      </Provider>
    );
    await act(async () => {
      fireEvent.change(screen.getByRole('textbox', { name: '' }), {
        target: { value: 'example@test.com' }
      });

      fireEvent.change(document.querySelector('input[name="password"]')!, {
        target: { value: 'Example123' }
      });
    });
    await act(async () => {
      fireEvent.blur(screen.getByRole('textbox', { name: '' }));
      fireEvent.blur(document.querySelector('input[name="password"]')!);
    });
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Register' }));
    });
    expect(screen.getByRole('textbox', { name: '' })).toHaveProperty(
      'value',
      ''
    );
    expect(screen.getByRole('textbox', { name: '' })).toHaveProperty(
      'value',
      ''
    );
  });
});
