import axios from 'axios';

export const api = axios.create({
  baseURL: "https://4737-103-46-11-230.ngrok-free.app/api/v1",
  headers: {
    "ngrok-skip-browser-warning": true,
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "*"
  }
});