import { cleanup, render, screen } from '@testing-library/react';
import DeletePopup from './DeletePopup';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import store from '../store/index';

afterEach(cleanup);

describe('DeletePopup component', () => {
  const queryClient = new QueryClient();
  test('renders text', () => {
    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>
            <DeletePopup />
          </MemoryRouter>
        </QueryClientProvider>
      </Provider>
    );

    const textElement = screen.getByText(/really want to delete/i);
    expect(textElement).toBeDefined();
  });
});
