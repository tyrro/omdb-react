import routes from './index';

describe('routes', () => {
  test('supports the required query params and format', () => {
    expect(routes.movies.index()).toEqual('/movies/all');
    expect(routes.courses.search({ i: 'imdbId' })).toEqual('/movies/search?i=imdbId');
  });
});
