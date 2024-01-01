import { TODO_CREATE, TODO_DELETE, TODO_FAIL } from '../types';

export default (state: any, action: any) => {
  switch (action.type) {
    case TODO_CREATE:
      return {
        ...state,
        loading: false,
      };

    case TODO_DELETE:
      return {
        ...state,
        loading: false,
      };
    case TODO_FAIL:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        error: null,
      };

    default:
      return state;
  }
};
