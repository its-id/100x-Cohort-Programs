import { useState } from 'react';
import './App.css';
import Header from './components/Header';

function App() {
  const [title, setTitle] = useState('React Deep Dive');

  const changeTitle = () => {
    // Math.random gives a random number b/w 0 and 1
    // toString(36) converts the number to a string in base 36
    // substring(7) gets the first 7 characters of the string
    const newTitle = Math.random().toString(36).substring(7);
    setTitle(newTitle);
  }

  return (
    //below is what we call a fragment
    <>
      <button onClick={changeTitle}>Click me to change the first title!</button>
      <Header title={title} changeTitle={changeTitle} />
      <Header title='React Deep Dive' />
    </>
  );
}

export default App;
