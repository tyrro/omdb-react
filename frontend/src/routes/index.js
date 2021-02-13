import urlTemplate from 'url-template';

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
};

export default routes;
