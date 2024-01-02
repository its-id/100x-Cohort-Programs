import {
  SIGNUP_USER,
  LOGIN_USER,
  LOGOUT_USER,
  GET_USER,
  AUTH_FAIL,
  CLEAR_ERROR,
} from '../types';

export default (state: any, action: any) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };

    case SIGNUP_USER:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
      };
    case LOGIN_USER:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        error: null,
      };

    case LOGOUT_USER:
    case AUTH_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
        loading: false,
        error: action.payload ? action.payload : null,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
