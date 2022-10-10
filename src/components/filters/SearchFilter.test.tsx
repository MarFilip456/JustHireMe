import { cleanup, render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import store from '../../store/index';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import SearchFilter from './SearchFilter';

afterEach(cleanup);
describe('SearchFilter component', () => {
  const queryClient = new QueryClient();
  test('uses passed props', () => {
    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>
            <SearchFilter searchFor="jobPosition" defaultProp="frontend" />
          </MemoryRouter>
        </QueryClientProvider>
      </Provider>
    );
    expect(document.querySelector('input[name="search"]')).toHaveProperty(
      'placeholder',
      'Search by position...'
    );
    expect(document.querySelector('input[name="search"]')).toHaveProperty(
      'defaultValue',
      'frontend'
    );
  });
});
