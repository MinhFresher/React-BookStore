import axios from 'axios';

const API = 'http://localhost:8080/api/auth';

export const login = async (credentials) => {
  return await axios.post(`${API}/login`, credentials);
};

export const register = async (data) => {
  return await axios.post(`${API}/register`, data);
};
