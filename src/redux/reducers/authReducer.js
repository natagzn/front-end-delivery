import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT} from '../actions/authActions';
// Initial state
const initialState = {
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  error: null,
};

// Reducer
export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return { ...state, error: null };
    case REGISTER_FAIL:
      return { ...state, error: action.payload };
    case LOGIN_SUCCESS:
      return { ...state, token: action.payload, isAuthenticated: true, error: null };
    case LOGIN_FAIL:
      return { ...state, error: action.payload };
    case LOGOUT:
      return { ...state, token: null, isAuthenticated: false };
    default:
      return state;
  }
};


export default authReducer;
