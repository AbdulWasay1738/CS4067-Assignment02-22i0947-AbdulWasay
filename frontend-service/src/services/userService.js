import axios from 'axios';

const USER_URL = process.env.REACT_APP_USER_URL || 'http://localhost:3001';

export async function registerUser(username, password) {
  const resp = await axios.post(`${USER_URL}/users/register`, { username, password });
  return resp.data; // e.g., { message: 'User registered', user: {...} }
}

export async function loginUser(username, password) {
  const resp = await axios.post(`${USER_URL}/users/login`, { username, password });
  return resp.data; // e.g., { message: 'Login successful', token: '...' }
}
