import { useEffect, useState } from 'react';
import axios from 'axios';
import Todo from '../Todo';

const TodosById = ({ id }) => {
  const [todos, setTodos] = useState([]);
  const getTodo = async (id) => {
    const res = await axios(
      `https://sum-server.100xdevs.com/todos?id=${id}`
    ).then((res) => {
      setTodos(res.data.todos);
    });
  };

  useEffect(() => {
    getTodo(id);
  }, [id]);

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

export default TodosById;
