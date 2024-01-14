import { useContext, useState } from 'react';
import { CountContext } from './context';
import { Navigate } from 'react-router-dom';

function UsingContext() {
  const [count, setCount] = useState(0);
  // wrap anyone that wants to use the teleported value inside a provider
  // recoil, redux, Themes in mUI
  return (
    <div>
      <CountContext.Provider value={count}>
        <Count setCount={setCount} />
      </CountContext.Provider>
    </div>
  );
}

function Count({ setCount }) {
  console.log('This component should re-render!');
  return (
    <div>
      <CountRenderer />
      <Buttons setCount={setCount} />
    </div>
  );
}

function CountRenderer() {
  const count = useContext(CountContext);
  return <div>{count}</div>;
}

function Buttons({ setCount }) {
  const count = useContext(CountContext);
  return (
    <div>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Increase
      </button>

      <button
        onClick={() => {
          setCount(count - 1);
        }}
      >
        Decrease
      </button>
    </div>
  );
}

export default UsingContext;
