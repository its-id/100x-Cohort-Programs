import { useState, useEffect } from 'react';
import axios from 'axios';

//we cannot create a custom hook inside a functional component
const useTodos = () => {
  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    //using axios instead of fetch
    const res = await axios('https://sum-server.100xdevs.com/todos').then(
      (res) => {
        setTodos(res.data.todos);
      }
    );
  };

  useEffect(() => {
    getTodos();
  }, []);

  return todos;
};

export default useTodos;
