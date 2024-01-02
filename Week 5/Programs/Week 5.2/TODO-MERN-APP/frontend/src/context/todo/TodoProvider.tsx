import { useReducer } from 'react';
import axios from 'axios';

import {
  GET_TODOS,
  CREATE_TODO,
  DELETE_TODO,
  TODO_FAIL,
  CLEAR_ERROR,
  MARK_COMPLETE,
  SET_LOADING,
  SET_TODO_LOADING,
} from '../types';
import TodoReducer from './TodoReducer';
import TodoContext from './TodoContext';
import { Todo } from '../../types/todo';
import setAuthToken from '../../utils/SetAuthToken';

const TodoProvider = (props: any) => {
  const initialState = {
    todos: [],
    loading: false,
    todoLoading: false,
    error: null,
  };

  const [state, dispatch] = useReducer(TodoReducer, initialState);

  const url = 'http://localhost:3001';

  const getTodos = async () => {
    try {
      if (localStorage.token) {
        setAuthToken(localStorage.token);
      }
      dispatch({ type: SET_TODO_LOADING });
      const res = await axios.get(url + '/todos');
      dispatch({
        type: GET_TODOS,
        payload: res.data.todos,
      });
    } catch (err: any) {
      console.log(err.response.data.error);
      dispatch({
        type: TODO_FAIL,
        payload: err.response.data.error,
      });
    }
  };

  const createTodo = async (todo: Todo) => {
    try {
      if (localStorage.token) {
        setAuthToken(localStorage.token);
      }
      dispatch({
        type: SET_LOADING,
      });
      const res = await axios.post(url + '/todos', todo);
      dispatch({
        type: CREATE_TODO,
        payload: {
          title: res.data.todo.title,
          description: res.data.todo.description,
          completed: res.data.todo.completed,
          _id: res.data.todo._id,
          createdAt: res.data.todo.createdAt,
        },
      });
    } catch (err: any) {
      console.log(err.response.data.error);
      dispatch({
        type: TODO_FAIL,
        payload: err.response.data.error,
      });
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      if (localStorage.token) {
        setAuthToken(localStorage.token);
      }
      dispatch({
        type: SET_LOADING,
      });
      dispatch({
        type: DELETE_TODO,
        payload: id,
      });
      await axios.delete(url + `/todos/${id}`);
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
        type: MARK_COMPLETE,
        payload: id,
      });
      await axios.put(url + '/todos', {
        id,
      });
    } catch (err: any) {
      console.log(err.response.data.error);
      dispatch({
        type: TODO_FAIL,
        payload: err.response.data.error,
      });
    }
  };

  const clearError = () => {
    dispatch({
      type: CLEAR_ERROR,
    });
  };

  return (
    <TodoContext.Provider
      value={{
        todoLoading: state.todoLoading,
        loading: state.loading,
        todos: state.todos,
        error: state.error,
        createTodo,
        markComplete,
        clearError,
        getTodos,
        deleteTodo,
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
