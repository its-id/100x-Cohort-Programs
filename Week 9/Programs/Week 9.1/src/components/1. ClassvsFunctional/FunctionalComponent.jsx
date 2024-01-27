import React, { useState } from 'react';

function FunctionalComponent() {
  const [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount(count + 1);
  };

  return (
    <>
      <p>{count}</p>
      <button onClick={incrementCount}>Increment</button>
    </>
  );
}

export default FunctionalComponent;
