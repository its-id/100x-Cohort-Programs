import { useEffect, useReducer } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';

import setAuthToken from '../../utils/SetAuthToken';
import {
  SIGNUP_USER,
  LOGIN_USER,
  GET_USER,
  AUTH_FAIL,
  SET_LOADING,
  CLEAR_ERROR,
  LOGOUT_USER,
} from '../types';
import AuthReducer from './AuthReducer';
import AuthContext from './AuthContext';
import { User } from '../../types/user';

const AuthProvider = (props: any) => {
  const initialState = {
    user: null,
    loading: false,
    isAuthenticated: null,
    error: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const url = 'http://localhost:3001';

  // Set token and load user
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }else{
      return;
    }
    dispatch({ type: SET_LOADING });
    try {
      const res = await axios.get(url + '/user/auth');
      dispatch({
        type: GET_USER,
        payload: res.data,
      });
    } catch (err: any) {
      dispatch({ type: AUTH_FAIL, payload: err.response.data.error });
    }
  };

  // Signup
  const signup = async (user: User) => {
    try {
      dispatch({ type: SET_LOADING });
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const res = await axios.post(url + '/user/signup', user, config);
      dispatch({
        type: SIGNUP_USER,
        payload: res.data,
      });
      // await loadUser();
    } catch (err: any) {
      dispatch({
        type: AUTH_FAIL,
        payload: err.response.data.error,
      });
      throw new Error(err.response.data.error);
    }
  };

  // Login
  const signin = async (user: User) => {
    try {
      dispatch({ type: SET_LOADING });
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const res = await axios.post(url + '/user/signin', user, config);
      dispatch({
        type: LOGIN_USER,
        payload: res.data,
      });
      // await loadUser();
    } catch (err: any) {
      dispatch({
        type: AUTH_FAIL,
        payload: err.response.data.error,
      });
      throw new Error(err.response.data.error);
    }
  };

  // Logout
  const logout = () => {
    dispatch({ type: SET_LOADING });
    dispatch({ type: LOGOUT_USER });
  };

  const clearError = () => {
    dispatch({
      type: CLEAR_ERROR,
    });
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loading: state.loading,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        error: state.error,
        signup,
        signin,
        logout,
        loadUser,
        clearError,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
