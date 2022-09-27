import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import store from '../store/index';
import { act, cleanup, render, screen } from '@testing-library/react';
import InformationPopup from './InformationPopup';
import { uiActions } from '../store/ui-slice';

afterEach(cleanup);

describe('InformationPopup component', () => {
  const queryClient = new QueryClient();
  test('does not render when not called', () => {
    const renderedString = 'test string';
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
    const renderedString = 'test string';
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
  jest.setTimeout(10000);
  test('closes after 4000ms', async () => {
    store.dispatch(uiActions.changeInformationPopup());
    const renderedString = 'test string2';
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
    // somehow need to postpone expect execution
    await act(async () => {
      await new Promise((resolve) =>
        setTimeout(() => {
          resolve(expect(screen.getByText('test string2')).toBeNull());
        }, 4001)
      );
    });
  });
});
