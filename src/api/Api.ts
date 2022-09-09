import axios from 'axios';

const Api = axios.create({
  baseURL: process.env.REACT_APP_API_ADRESS
});

export const getOffers = async () => {
  const response = await Api.get('/offer');
  return response;
};
