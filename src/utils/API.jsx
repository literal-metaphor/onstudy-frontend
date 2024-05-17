import axios from 'axios';

export const api = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  headers: {
    "ngrok-skip-browser-warning": true,
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "*"
  }
});