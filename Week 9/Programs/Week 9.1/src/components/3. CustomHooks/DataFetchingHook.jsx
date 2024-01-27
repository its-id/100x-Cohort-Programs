import { useEffect, useState } from 'react';
import axios from 'axios';

function DataFetchingHook() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get('https://sum-server.100xdevs.com/todos').then((res) => {
      setTodos(res.data.todos);
    });
  }, []);

  return (
    <>
      {todos.map((todo, idx) => (
        <Track key={`todo-${idx}`} todo={todo} />
      ))}
    </>
  );
}

function Track({ todo }) {
  return (
    <div>
      {todo.title}
      <br />
      {todo.description}
    </div>
  );
}

export default DataFetchingHook;
