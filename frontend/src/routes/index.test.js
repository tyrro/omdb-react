import routes from './index';

describe('routes', () => {
  test('supports the required query params and format', () => {
    expect(routes.movies.index()).toEqual('http://localhost:8000/movies/all');
    expect(routes.movies.search({ i: 'imdbId' })).toEqual(
      'http://localhost:8000/movies/search?i=imdbId',
    );
  });
});
