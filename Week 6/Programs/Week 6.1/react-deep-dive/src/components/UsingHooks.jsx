import { useState, useEffect } from 'react';
import Todo from './Todo';

const UsingHooks = () => {
  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    const res = await fetch('https://sum-server.100xdevs.com/todos');
    const data = await res.json();
    setTodos(data.todos);
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

export default UsingHooks;
