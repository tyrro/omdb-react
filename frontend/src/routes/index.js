import urlTemplate from 'url-template';
const BACKEND_URL = 'http://localhost:8000';

function url(template, params) {
  const myParams = { ...params };
  if (myParams.format === undefined) {
    myParams.format = 'json';
  }
  return urlTemplate.parse(template).expand(myParams);
}

const routes = {
  courses: {
    index: params => url('/courses{.format}{?page}', params),
    create: params => url('/courses{.format}', params),
    update: params => url('/courses/{courseId}{.format}', params),
    destroy: params => url('/courses/{courseId}{.format}', params),
  },
  users: {
    create: params => url(`${BACKEND_URL}/users`, params),
    login: params => url(`${BACKEND_URL}/token`, params),
  },
};

export default routes;
