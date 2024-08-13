// src/components/auth/AuthService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/auth';

const login = (credentials) => {
  return axios.post(`${API_URL}/login`, credentials);
};

const verifyOtp = (data) => {
  return axios.post(`${API_URL}/verify-otp`, data);
};

export { login, verifyOtp };
