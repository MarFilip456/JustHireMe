import { rest } from 'msw';

export const handlers = [
  rest.post('http://localhost:3500/auth/signin', (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.post('http://localhost:3500/auth/signup/dev', (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.get(
    'https://maps.googleapis.com/maps/api/geocode/json',
    (req, res, ctx) => {
      const returnedValue = res(
        ctx.json({
          results: [{ geometry: { location: { lat: 12, lng: 23 } } }]
        })
      );
      return returnedValue;
    }
  ),
  rest.get('http://localhost:3500/auth', (req, res, ctx) => {
    return res(
      ctx.json({
        id: '123456',
        name: 'DevName',
        surname: 'DevSurname',
        location: 'City',
        email: 'example@test.com'
      })
    );
  })
];
