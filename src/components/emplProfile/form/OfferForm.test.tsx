import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import store from '../../../store/index';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import OfferForm from './OfferForm';
import { offersActions } from '../../../store/offers-slice';

afterEach(cleanup);

describe('OfferForm component', () => {
  const queryClient = new QueryClient();
  test('renders initial content', () => {
    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>
            <OfferForm />
          </MemoryRouter>
        </QueryClientProvider>
      </Provider>
    );
    expect(screen.getByText('Here you can add new offers.')).toBeDefined();
    expect(screen.queryByText('Completed')).toBeNull();
    expect(screen.queryByText('You finished all steps!')).toBeNull();
  });
  test('renders FormCompanyInfo content after "Start" is clicked', async () => {
    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>
            <OfferForm />
          </MemoryRouter>
        </QueryClientProvider>
      </Provider>
    );
    const startButton = screen.getByText('Start');
    fireEvent.click(startButton);
    expect(screen.queryByText('Here you can add new offers.')).toBeNull();
    expect(await screen.getByText(/Completed/)).toBeDefined();
    expect(await screen.getByText('Office location')).toBeDefined();
    expect(screen.queryByText('You finished all steps!')).toBeNull();
  });
  test('does not allow you to proceed without filled FormCompanyInfo', async () => {
    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>
            <OfferForm />
          </MemoryRouter>
        </QueryClientProvider>
      </Provider>
    );
    const startButton = screen.getByText('Start');
    fireEvent.click(startButton);
    const checkButton = await screen.getByText('Check entered location');
    fireEvent.click(checkButton);
    expect(await screen.queryByText('Next')).toBeNull();
    expect(await screen.getByText(/Completed/)).toBeDefined();
    expect(await screen.queryByText('Position')).toBeNull();
  });
  test('renders FormPositionInfo after you completed FormCompanyInfo', async () => {
    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>
            <OfferForm />
          </MemoryRouter>
        </QueryClientProvider>
      </Provider>
    );
    const startButton = screen.getByText('Start');
    fireEvent.click(startButton);
    // selecting and entering value for companyName
    const inputCompanyName = await document.querySelector(
      'input[name="companyName"]'
    );
    fireEvent.change(inputCompanyName!, { target: { value: 'CompanyName' } });
    fireEvent.blur(inputCompanyName!);
    // selecting and entering value for companySize
    const inputCompanySize = await document.querySelector(
      'input[name="companySize"]'
    );
    fireEvent.change(inputCompanySize!, { target: { value: 456 } });
    fireEvent.blur(inputCompanySize!);
    // selecting and entering value for companyLocation
    const inputCompanyLocation = await document.querySelector(
      'input[name="location"]'
    );
    fireEvent.change(inputCompanyLocation!, { target: { value: 'Kraków' } });
    fireEvent.blur(inputCompanyLocation!);
    // selecting and checking box for remote
    const inputRadioRemote = await document.querySelector(
      'input[name="remote"]'
    );
    fireEvent.change(inputRadioRemote!, { target: { checked: true } });
    // selecting and clicking Check location button
    const checkButton = await screen.getByText('Check entered location');
    // selecting and entering value for logoUrl
    const inputLogoUrl = await document.querySelector('input[name="logo"]');
    fireEvent.change(inputLogoUrl!, {
      target: {
        value:
          'http://pm1.narvii.com/7119/b0abdf491cffde4bdf95850956c1b15a5591a4b5r1-712-707v2_uhq.jpg'
      }
    });
    fireEvent.blur(inputLogoUrl!);
    // Before clicking Check entered location Next shouldn't be visible
    expect(await screen.queryByText('Next')).toBeNull();
    fireEvent.click(checkButton);
    // Next shoult take place after Check entered location is gone
    expect(await screen.findByText('Next')).toBeDefined();
    expect(await screen.queryByText('Position')).toBeNull();
    // selecting and clicking Next button
    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);
    // OfferForm2 content should appear
    expect(await screen.findByText('Position')).toBeDefined();
  });
  test('saves entered values in FormCompanyInfo', async () => {
    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>
            <OfferForm />
          </MemoryRouter>
        </QueryClientProvider>
      </Provider>
    );
    const startButton = screen.getByText('Start');
    fireEvent.click(startButton);
    // setting values for OfferForm1
    store.dispatch(
      offersActions.addOffer({
        companyName: 'companyName',
        companySize: 123,
        location: 'Kraków',
        lat: 12,
        lng: 23,
        logo: 'http://pm1.narvii.com/7119/b0abdf491cffde4bdf95850956c1b15a5591a4b5r1-712-707v2_uhq.jpg',
        fullyRemote: undefined
      })
    );
    // selecting and clicking Next button
    fireEvent.click(screen.getByText('Next'));
    // selecting Back button in OfferForm2
    fireEvent.click(await screen.findByText('Back'));
    const someValue = await document.querySelector('input[name="location"]');
    expect(someValue).toHaveProperty('value', 'Kraków');
  });
});
