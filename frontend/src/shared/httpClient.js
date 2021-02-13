import axios from 'axios';
import camelcaseKeys from 'camelcase-keys';

const myAxios = axios.create({
  withCredentials: false,
});

myAxios.defaults.transformResponse.push(data => {
  if (typeof data !== 'object' || data === null) {
    return data;
  }
  return camelcaseKeys(data, { deep: true });
});

export default myAxios;
