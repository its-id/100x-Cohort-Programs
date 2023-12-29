import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [id, setId] = useState(0);
  const [currTodo, setCurrTodo] = useState({
    id: id,
    title: '',
    desc: '',
    completed: false,
  });

  const onInputChange = (e) => {
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

  const markAsDone = (id) => {
    const updatedTodos = todos.map((todo) => {
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
          <button onClick={(e) => addTodo()}>Add Todo</button>
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
                    <p>{todo.desc}</p>
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
