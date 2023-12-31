import { useState } from 'react';
import { Todo } from './types/todo.ts';
import './App.css';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [id, setId] = useState<string>('0');
  const [currTodo, setCurrTodo] = useState<Todo>({
    id: id,
    title: '',
    description: '',
    completed: false,
  });

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrTodo({
      ...currTodo,
      [e.target.name]: e.target.value,
    });
  };

  const addTodo = () => {
    setId(id + 1);
    setCurrTodo({
      ...currTodo,
      id: id + 1,
    });
    setTodos([...todos, currTodo]);
  };

  const markAsDone = (id: string) => {
    const updatedTodos = todos.map((todo: Todo) => {
      if (todo.id === id) {
        todo.completed = true;
      }
      return todo;
    });
    console.log('updatedTodos', updatedTodos);
    setTodos(updatedTodos);
  };

  return (
    <div className='container'>
      <div className='header'>
        <h1>TODO App</h1>
      </div>
      <div className='todos-wrapper'>
        <div className='add-todo-container'>
          <input
            type='text'
            name='title'
            placeholder='Todo Title'
            onChange={onInputChange}
          />
          <input
            type='text'
            name='desc'
            placeholder='Todo Description'
            onChange={onInputChange}
          />
          <button onClick={addTodo}>Add Todo</button>
        </div>
        <div className='todos-container'>
          {todos.length > 0 &&
            todos.map((todo, idx) => {
              return (
                <div className='single-todo' key={idx}>
                  <div
                    className={`todo-main ${todo.completed ? 'todo-done' : ''}`}
                  >
                    <p className='todo-title'>{todo.title}</p>
                    <p>:</p>
                    <p>{todo.description}</p>
                  </div>
                  <button
                    disabled={todo.completed}
                    className={`todo-btn ${
                      todo.completed ? 'btn-disabled' : ''
                    }`}
                    onClick={() => markAsDone(todo.id)}
                  >
                    Mark as Done
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default App;
