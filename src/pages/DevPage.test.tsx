import { render, screen, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import store from '../store/index';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import DevPage from './DevPage';

describe('DevPage component', () => {
  const queryClient = new QueryClient();
  test('displays fetched data', async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <MemoryRouter>
              <DevPage />
            </MemoryRouter>
          </QueryClientProvider>
        </Provider>
      );
    });
    expect(screen.getByRole('textbox', { name: 'Name' })).toHaveProperty(
      'value',
      'DevName'
    );
    expect(screen.getByRole('textbox', { name: 'Surname' })).toHaveProperty(
      'value',
      'DevSurname'
    );
    expect(screen.getByRole('textbox', { name: 'E-mail' })).toHaveProperty(
      'value',
      'example@test.com'
    );
    expect(screen.getByRole('textbox', { name: 'City' })).toHaveProperty(
      'value',
      'City'
    );
  });
});
