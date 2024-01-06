import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import HeaderWithButton from './components/HeaderWithButton';
import Todo from './components/Todo';
import Card from './components/Card';
import CardTakingChildren from './components/CardTakingChildren';
import UsingHooks from './components/UsingHooks';

function App() {
  // FIRST PART
  /*
  const [title, setTitle] = useState('React Deep Dive');

  const changeTitle = () => {
    // Math.random gives a random number b/w 0 and 1
    // toString(36) converts the number to a string in base 36
    // substring(7) gets the first 7 characters of the string
    const newTitle = Math.random().toString(36).substring(7);
    setTitle(newTitle);
  };
  */

  //2nd PART
  /*
  const [todoId, setTodoId] = useState(4);
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: '1. Learn React',
      description: 'Learn React and build a cool app',
    },
    {
      id: 2,
      title: '2. Learn Firebase',
      description: 'Learn Firebase and build a cool app',
    },
    {
      id: 3,
      title: '3. Learn GraphQL',
      description: 'Learn GraphQL and build a cool app',
    },
  ]);

  const addTodo = () => {
    setTodos([
      ...todos,
      {
        id: todoId,
        title: `${todoId}. Learn Redux`,
        description: `Learn Redux and build a cool app ${todoId}`,
      },
    ]);
    setTodoId(todoId + 1);
  };
  */

  return (
    //below is what we call a fragment
    <>
      {/* 1st PART */}
      {/* <button onClick={changeTitle}>Click me to change the first title!</button>
      <Header title={title} />
      <Header title={title} />
      <Header title='React Deep Dive' /> */}

      {/* 2nd PART */}
      {/* <button onClick={addTodo}>Add Todo</button>
      {todos.map((todo) => (
        <Todo key={todo.id} title={todo.title} description={todo.description} />
      ))} */}

      {/* 3rd PART */}
      {/* <Card innerComponent={<TextComponent />} />
      <CardTakingChildren>This is a children text!</CardTakingChildren> */}

      {/* 4th PART: USING HOOKS */}
      <UsingHooks />
    </>
  );
}

// PART 3
const TextComponent = () => {
  return <p>This is the Text Component!</p>;
};

export default App;
