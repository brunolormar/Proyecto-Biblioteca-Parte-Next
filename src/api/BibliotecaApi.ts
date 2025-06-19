import axios from 'axios';

const libreriaApi = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export default libreriaApi;