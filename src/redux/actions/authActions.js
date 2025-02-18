import axios from 'axios';

export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';

export const registerUser = (userData) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:3000/api/auth/register', userData);
    dispatch({ type: REGISTER_USER_SUCCESS, payload: response.data });
  } catch (error) {
    console.error('Error registering user:', error);
  }
};


