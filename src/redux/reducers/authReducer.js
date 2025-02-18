import { REGISTER_USER_SUCCESS } from '../actions/authActions';

const initialState = {
  user: null,
  error: null,
  loading: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: null,
        loading: false,
      };
    default:
      return state;
  }
};

export default authReducer;
