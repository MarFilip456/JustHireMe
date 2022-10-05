import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import store from '../store/index';
import { cleanup, render, screen } from '@testing-library/react';
import InformationPopup from './InformationPopup';
import { uiActions } from '../store/ui-slice';

afterEach(cleanup);

describe('InformationPopup component', () => {
  const queryClient = new QueryClient();
  const renderedString = 'test string';
  test('does not render when not called', () => {
    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>
            <InformationPopup />
          </MemoryRouter>
        </QueryClientProvider>
      </Provider>
    );
    store.dispatch(uiActions.showInformation(renderedString));

    expect(screen.queryByText(renderedString)).toBeNull();
  });
  test('shows passed string', () => {
    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>
            <InformationPopup />
          </MemoryRouter>
        </QueryClientProvider>
      </Provider>
    );
    store.dispatch(uiActions.showInformation(renderedString));
    store.dispatch(uiActions.changeInformationPopup());

    expect(screen.getByText(renderedString)).toBeDefined();
  });
});
