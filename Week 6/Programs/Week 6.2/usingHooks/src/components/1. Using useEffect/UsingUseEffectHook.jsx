import { useState, useEffect } from 'react';
import axios from 'axios';
import Todo from '../Todo';

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

  //BUG: if a state is called two times in a row, and the second call completes after the first call for some reason, then the first call's operation will overwrite the second call which is wrong.
  //To Handle this bug: we use a package called use-async-effect package
  useEffect(() => {
    getTodos();
  }, []);

  return (
    <>
      <h1>Using useEffect Hook - Example 1</h1>

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
