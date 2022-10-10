import { cleanup, render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import store from '../../store/index';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Filters from './Filters';
import { offersActions } from '../../store/offers-slice';
import { act } from 'react-dom/test-utils';

afterEach(cleanup);

describe('Filters component', () => {
  const queryClient = new QueryClient();
  test('sets default values', () => {
    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>
            <Filters />
          </MemoryRouter>
        </QueryClientProvider>
      </Provider>
    );
    expect(screen.getByRole('option', { name: 'All forms' })).toHaveProperty(
      'selected',
      true
    );
    expect(screen.getByRole('option', { name: 'B2B' })).toHaveProperty(
      'selected',
      false
    );
  });
  test('sets default values according to the store', async () => {
    await act(async () => {
      store.dispatch(offersActions.setQueryObject({ employment: 'b2b' }));
    });
    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>
            <Filters />
          </MemoryRouter>
        </QueryClientProvider>
      </Provider>
    );
    expect(screen.getByRole('option', { name: 'All forms' })).toHaveProperty(
      'selected',
      false
    );
    expect(screen.getByRole('option', { name: 'B2B' })).toHaveProperty(
      'selected',
      true
    );
  });
});
