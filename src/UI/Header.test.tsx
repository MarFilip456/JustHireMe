import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import store from '../store/index';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import Header from './Header';
import { uiActions } from '../store/ui-slice';

afterEach(cleanup);

describe('Header component', () => {
  const queryClient = new QueryClient();
  test('does not render SignOut button and renders SignIn button', () => {
    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>
            <Header />
          </MemoryRouter>
        </QueryClientProvider>
      </Provider>
    );
    const logoutButton = screen.queryByText('Sign out');
    const loginButton = screen.getByText('Sign in');
    expect(logoutButton).toBeNull();
    expect(loginButton).toBeDefined();
  });
  test('clears localStorage after logout for an employeer', () => {
    localStorage.setItem('justHireMeDate', 'date');
    localStorage.setItem('justHireMeToken', 'token');
    store.dispatch(uiActions.loggingInOut());
    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>
            <Header />
          </MemoryRouter>
        </QueryClientProvider>
      </Provider>
    );
    const logoutButton = screen.getByText('Sign out');
    fireEvent.click(logoutButton);
    expect(localStorage.getItem('justHireMeId')).toBeNull();
  });
  test('clears localStorage after logout for a developer', () => {
    localStorage.setItem('justHireMeDate', 'date');
    localStorage.setItem('justHireMeToken', 'token');
    localStorage.setItem('justHireMeDev', 'dev');
    store.dispatch(uiActions.loggingInOut());
    store.dispatch(uiActions.setIsDev());
    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>
            <Header />
          </MemoryRouter>
        </QueryClientProvider>
      </Provider>
    );
    const logoutButton = screen.getByText('Sign out');
    fireEvent.click(logoutButton);
    expect(localStorage.getItem('justHireMeDev')).toBeNull();
  });
  test('renders addOffer button for logged in employers', () => {
    localStorage.setItem('justHireMeDate', 'date');
    localStorage.setItem('justHireMeToken', 'token');
    localStorage.setItem('justHireMeDev', 'dev');
    store.dispatch(uiActions.loggingInOut());
    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>
            <Header />
          </MemoryRouter>
        </QueryClientProvider>
      </Provider>
    );
    const addOfferButton = screen.getByText('Add offer');
    expect(addOfferButton).toBeDefined();
  });
});
