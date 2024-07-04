import axios from 'axios';

export const api = axios.create({
  baseURL: "http://localhost:8000/api/v2",
  headers: {
    'Accept': 'application/json',
    "Content-Type": "multipart/form-data",
  }
});