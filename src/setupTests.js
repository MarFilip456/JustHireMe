import { server } from './mocks/server.js';
import { cleanup } from '@testing-library/react';

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterEach(cleanup);
afterAll(() => server.close())

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn()
};
global.localStorage = localStorageMock;
