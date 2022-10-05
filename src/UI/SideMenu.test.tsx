import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import store from '../store/index';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import SideMenu from './SideMenu';
import { uiActions } from '../store/ui-slice';

afterEach(cleanup);

describe('SideMenu component', () => {
  const queryClient = new QueryClient();
  let testClasses: React.CSSProperties;
  test('not renders unauthorized buttons', () => {
    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>
            <SideMenu styles={testClasses} />
          </MemoryRouter>
        </QueryClientProvider>
      </Provider>
    );
    expect(screen.queryByText('My profile')).toBeNull();
    expect(screen.queryByText('Add offer')).toBeNull();
    expect(screen.queryByText('Log out')).toBeNull();
  });
  test('renders buttons for logged in dev but not for employer', () => {
    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>
            <SideMenu styles={testClasses} />
          </MemoryRouter>
        </QueryClientProvider>
      </Provider>
    );
    store.dispatch(uiActions.loggingInOut());
    store.dispatch(uiActions.setIsDev());
    expect(screen.getByText('My profile')).toBeDefined();
    expect(screen.queryByText('Add offer')).toBeNull();
    expect(screen.getByText('Log out')).toBeDefined();
  });
  test('renders buttons for logged in employer but not for dev', () => {
    store.dispatch(uiActions.loggingInOut());
    store.dispatch(uiActions.setIsDev());
    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>
            <SideMenu styles={testClasses} />
          </MemoryRouter>
        </QueryClientProvider>
      </Provider>
    );
    store.dispatch(uiActions.loggingInOut());
    expect(screen.getByText('My profile')).toBeDefined();
    expect(screen.getByText('Add offer')).toBeDefined();
    expect(screen.getByText('Log out')).toBeDefined();
  });
  test('clears local storage after logout', () => {
    store.dispatch(uiActions.loggingInOut());
    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>
            <SideMenu styles={testClasses} />
          </MemoryRouter>
        </QueryClientProvider>
      </Provider>
    );
    store.dispatch(uiActions.loggingInOut());
    const logoutButton = screen.getByText('Log out');
    fireEvent.click(logoutButton);
    expect(localStorage.getItem('justHireMeId')).toBeNull();
  });
});
