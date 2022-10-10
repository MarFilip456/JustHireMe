import { cleanup, render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import store from '../../../store/index';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import DevShort from './DevShort';

afterEach(cleanup);

describe('DevShort component', () => {
  const queryClient = new QueryClient();
  test('renders passed props and fallback message if not props are provided', () => {
    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>
            <DevShort
              name='developer'
              surname='developings'
              logo='logoUrl'
              experience=''
              mainLang=''
              location='city'
              id='123'
            />
          </MemoryRouter>
        </QueryClientProvider>
      </Provider>
    );
    expect(screen.getByText('developer developings')).toBeDefined();
    expect(screen.getByText('city')).toBeDefined();
    expect(screen.getByText('Unknown experience')).toBeDefined();
    expect(screen.getByText('Unknown main')).toBeDefined();
  });
});