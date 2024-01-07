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

  //BUG: if a state is called two times in a row, and the first call completes after the second call, then the first call's will overwrite the second call.
  useEffect(() => {
    getTodos();
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
