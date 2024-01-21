import { useEffect } from 'react';
import { useRef } from 'react';
import { useState, memo } from 'react';

const UsingUseRef = () => {
  const [count, setCount] = useState(200);
  const countRef = useRef();

  useEffect(() => {
    //after 2s, countRef.current is used to set the div innerHTML value to 201
    setTimeout(() => {
      console.log('Counter changed using useRef after 2s:', countRef.current);
      countRef.current.innerHTML = 201;
    }, 2000);
  }, []);

  return (
    <>
      <h1>Using useRef Hook</h1>
      <p ref={countRef}>{count}</p>
    </>
  );
};

export default UsingUseRef;
