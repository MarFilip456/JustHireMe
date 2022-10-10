import { cleanup, render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import store from '../../../store/index';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import DevExtended from './DevExtended';

afterEach(cleanup);

describe('DevExtended component', () => {
  const queryClient = new QueryClient();
  test('renders passed props and fallback messages', async () => {
    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>
            <DevExtended
              email="example@test.com"
              aboutYou=""
              gitHub="gitHubUrl"
              linkedIn=""
              id="123"
              expandDescription={true}
            />
          </MemoryRouter>
        </QueryClientProvider>
      </Provider>
    );
    jest.useFakeTimers();
    expect(screen.getByText('example@test.com')).toBeDefined();
    expect(screen.getByText('User did not fill this area.')).toBeDefined();
    expect(screen.getByText('Not provided by applyer')).toBeDefined();
    jest.useRealTimers();
  });
});
