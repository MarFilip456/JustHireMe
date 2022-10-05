import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import store from '../../../store/index';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import FormOfferSalary from './FormOfferSalary';

afterEach(cleanup);

describe('FormOffersalary component', () => {
  const queryClient = new QueryClient();
  test('does not render initially UoP and B2b salary inputs', async () => {
    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>
            <FormOfferSalary onDecrement={jest.fn()} onIncrement={jest.fn()} />
          </MemoryRouter>
        </QueryClientProvider>
      </Provider>
    );
    const uopSalaryInput = await document.querySelector(
      'input[name="uopSalaryMin"]'
    );
    expect(screen.getByText('Undisclosed salary?')).toBeDefined();
    expect(uopSalaryInput).toBeNull();
  });
  test('renders uopSalaryInput after setUop is clicked', async () => {
    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>
            <FormOfferSalary onDecrement={jest.fn()} onIncrement={jest.fn()} />
          </MemoryRouter>
        </QueryClientProvider>
      </Provider>
    );
    const setUopInput = await document.querySelector('input[name="setUop"]');
    fireEvent.click(setUopInput!);
    const uopSalaryInput = await document.querySelector(
      'input[name="uopSalaryMin"]'
    );
    expect(screen.getByText('Undisclosed salary?')).toBeDefined();
    expect(uopSalaryInput).toBeDefined();
  });
  test('renders b2bSalaryInput after setB2b is clicked', async () => {
    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>
            <FormOfferSalary onDecrement={jest.fn()} onIncrement={jest.fn()} />
          </MemoryRouter>
        </QueryClientProvider>
      </Provider>
    );
    const setB2bInput = await document.querySelector('input[name="setB2b"]');
    fireEvent.click(setB2bInput!);
    const ub2bSalaryInput = await document.querySelector(
      'input[name="b2bSalaryMin"]'
    );
    expect(screen.getByText('Undisclosed salary?')).toBeDefined();
    expect(ub2bSalaryInput).toBeDefined();
  });
  test('does not render setUop nor setB2b when undisclosed is selected', async () => {
    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>
            <FormOfferSalary onDecrement={jest.fn()} onIncrement={jest.fn()} />
          </MemoryRouter>
        </QueryClientProvider>
      </Provider>
    );
    const undisclosedInput = await document.querySelector('input[value="yes"');
    fireEvent.click(undisclosedInput!);
    const setB2bInput = await document.querySelector('input[name="setB2b"]');
    const setUopInput = await document.querySelector('input[name="setUop"]');
    expect(setB2bInput).toBeNull();
    expect(setUopInput).toBeNull();
  });
});
