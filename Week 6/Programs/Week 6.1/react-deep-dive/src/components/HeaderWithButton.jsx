import React from 'react';

const HeaderWithButton = () => {
  const [title, setTitle] = useState('React Deep Dive');

  const changeTitle = () => {
    // Math.random gives a random number b/w 0 and 1
    // toString(36) converts the number to a string in base 36
    // substring(7) gets the first 7 characters of the string
    const newTitle = Math.random().toString(36).substring(7);
    setTitle(newTitle);
  };

  return (
    <>
      <button onClick={changeTitle}>Click me to change the first title!</button>
      <p>{title}</p>
    </>
  );
};

export default HeaderWithButton;
