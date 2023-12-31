import React from 'react';
import Input from './common/Input';
import Button from './common/Button';
import TodoItem from './TodoItem.tsx';
import { useState } from 'react';
import { Todo } from '../types/todo.ts';

const Layout = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [id, setId] = useState<string>('0');
  const [currTodo, setCurrTodo] = useState<Todo>({
    _id: id,
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
      _id: id + 1,
    });
    setTodos([...todos, currTodo]);
  };

  const markAsDone = (id: string) => {
    const updatedTodos = todos.map((todo: Todo) => {
      if (todo._id === id) {
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
          <Input
            type='text'
            name='title'
            placeholder='Enter Todo Title'
            onChange={onInputChange}
          />
          <Input
            type='text'
            name='description'
            placeholder='Enter Todo Description'
            onChange={onInputChange}
          />
          <Button text='Add Todo' onClick={addTodo} />
        </div>
        <div className='todos-container'>
          {todos.length > 0 &&
            todos.map((todo, idx) => {
              return <TodoItem key={idx} todo={todo} markAsDone={markAsDone} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default Layout;
