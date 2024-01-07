import { useState, useEffect } from 'react';
import axios from 'axios';
import Todo from './Todo';

const UsingUseEffectHook = () => {
  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    //using axios instead of fetch
    const res = await axios('https://sum-server.100xdevs.com/todos').then(
      (res) => {
        setTodos(res.data.todos);
      }
    );
  };

  //TODO: polling - getTodos every 5 seconds
  useEffect(() => {
    getTodos();
    const interval = setInterval(() => {
      getTodos();
    }, 5000);
    return () => clearInterval(interval); //cleanup function - runs when component unmounts
  }, []);

  return (
    <>
      {todos.map((todo) => {
        return (
          <Todo
            key={todo.id}
            title={todo.title}
            description={todo.description}
          />
        );
      })}
    </>
  );
};

export default UsingUseEffectHook;
