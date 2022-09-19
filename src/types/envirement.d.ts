export {}

declare global {
  // eslint-disable-next-line no-unused-vars
  namespace NodeJS {
    // eslint-disable-next-line no-unused-vars
    interface ProcessEnv {
        REACT_APP_API_DATABASE_URL: string;
        REACT_APP_MAP_KEY: string;
    }
  }
}