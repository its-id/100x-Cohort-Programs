import { useEffect, useState } from 'react';
import axios from 'axios';

const useTodos = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get('https://sum-server.100xdevs.com/todos').then((res) => {
      setTodos(res.data.todos);
    });
  }, []);

  return todos;
};

export default useTodos;
