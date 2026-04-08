// src/api/AxiosInstance.js
import axios from 'axios';

const AxiosInstance = axios.create({
  baseURL: 'http://localhost:8088/api/v1/', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default AxiosInstance;
