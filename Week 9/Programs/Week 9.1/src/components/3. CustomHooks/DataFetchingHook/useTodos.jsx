import { useEffect, useState } from 'react';
import axios from 'axios';

const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get('https://sum-server.100xdevs.com/todos').then((res) => {
      setTodos(res.data.todos);
      setLoading(false);
    });
  }, []);

  return { todos, loading};
};

export default useTodos;
