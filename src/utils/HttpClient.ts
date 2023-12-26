import axios from 'axios';
import {BASE_URL} from '../constants';
export const HttpClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
