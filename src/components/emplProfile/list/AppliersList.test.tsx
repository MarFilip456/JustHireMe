import { cleanup, render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import store from '../../../store/index';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import AppliersList from './AppliersList';

afterEach(cleanup);

describe('AppliersList component', () => {
  const queryClient = new QueryClient();
  test('renders fallback message if noone applied', () => {
    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>
            <AppliersList job={{ appliers: [] }} />
          </MemoryRouter>
        </QueryClientProvider>
      </Provider>
    );
    expect(screen.getByText('No one applied yet.')).toBeDefined();
  });
});
