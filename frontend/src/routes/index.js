import urlTemplate from 'url-template';
const BASE_BACKEND_URL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : 'HEROKU URL';

function url(template, params) {
  const myParams = { ...params };
  if (myParams.format === undefined) {
    myParams.format = 'json';
  }
  return urlTemplate.parse(template).expand(myParams);
}

const routes = {
  users: {
    create: params => url(`${BASE_BACKEND_URL}/users`, params),
    login: params => url(`${BASE_BACKEND_URL}/token`, params),
    favoriteMovies: {
      index: params => url(`${BASE_BACKEND_URL}/user/favorite_movies`, params),
      create: params => url(`${BASE_BACKEND_URL}/user/favorite_movies`, params),
    },
  },

  movies: {
    index: params => url(`${BASE_BACKEND_URL}/movies/all{?s,y}`, params),
    search: params => url(`${BASE_BACKEND_URL}/movies/search{?i}`, params),
  },
};

export default routes;
