import axios from 'axios';

// Action types
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT = 'LOGOUT';

// Base API URL
const API_URL = 'http://localhost:4000/auth';

// Register Action
export const register = (userData) => async (dispatch) => {
  try {
    const response = await axios.post(`http://localhost:4000/user/create`, userData);
    dispatch({ type: REGISTER_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: REGISTER_FAIL, payload: error.response?.data?.message || 'Registration failed' });
  }
};

export const login = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    console.log("res -  ",response);
    localStorage.setItem('token', response.data.token.access_token);
    dispatch({ type: LOGIN_SUCCESS, payload: response.data.token.access_token});
  } catch (error) {
    console.log("email -  ", email, password);
    dispatch({ type: LOGIN_FAIL, payload: error.response?.data?.message || 'Login failed' });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('token');
  dispatch({ type: LOGOUT });
};


