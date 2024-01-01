import { useReducer } from 'react';
import axios from 'axios';

import { TODO_CREATE, TODO_DELETE, TODO_FAIL, CLEAR_ERROR } from '../types';
import TodoReducer from './TodoReducer';
import TodoContext from './TodoContext';
import { Todo } from '../../../types/todo';
import setAuthToken from '../../../utils/SetAuthToken';

const TodoProvider = (props: any) => {
  const initialState = {
    todos: [],
    loading: false,
    error: null,
  };

  const [state, dispatch] = useReducer(TodoReducer, initialState);

  const url = 'http://localhost:3001';

  const createTodo = async (todo: Todo) => {
    try {
      if (localStorage.token) {
        setAuthToken(localStorage.token);
      }
      dispatch({
        type: TODO_CREATE,
        payload: todo,
      });
      await axios.post(url + '/todos', todo);
    } catch (err: any) {
      console.log(err.response.data.error);
      dispatch({
        type: TODO_FAIL,
        payload: err.response.data.error,
      });
    }
  };

  const markComplete = async (id: string) => {
    try {
      if (localStorage.token) {
        setAuthToken(localStorage.token);
      }
      dispatch({
        type: TODO_DELETE,
        payload: id,
      });
      await axios.put(url + '/todos', {
        id
      });
    } catch (err: any) {
      console.log(err.response.data.error);
      dispatch({
        type: TODO_FAIL,
        payload: err.response.data.error,
      });
    }
  }

  const clearError = () => {
    dispatch({
      type: CLEAR_ERROR,
    });
  };

  //   useEffect(() => {
  //     loadUser();
  //   }, []);

  return (
    <TodoContext.Provider
      value={{
        loading: state.loading,
        todos: state.todos,
        error: state.error,
        createTodo,
        markComplete,
        clearError,
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
