import { useContext, useReducer } from 'react';
import { CountContext } from './context';

function UsingContext() {
  // wrap anyone that wants to use the teleported value inside a provider
  // recoil, redux, Themes in mUI
  const reducerFn = (state, action) => {
    switch (action.type) {
      case 'INCREMENT':
        return state + 1;

      case 'DECREMENT':
        return state - 1;

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducerFn, 0); //0 is the initial state

  return (
    <div>
      <CountContext.Provider
        value={{
          count: state,
          increment: () => dispatch({ type: 'INCREMENT' }),
          decrement: () => dispatch({ type: 'DECREMENT' }),
        }}
      >
        <Count />
      </CountContext.Provider>
    </div>
  );
}

function Count() {
  console.log('This component should not re-render!');
  return (
    <div>
      <CountRenderer />
      <Buttons />
    </div>
  );
}

function CountRenderer() {
  const { count } = useContext(CountContext);
  return <div>{count}</div>;
}

function Buttons() {
  const { increment, decrement } = useContext(CountContext);
  return (
    <div>
      <button onClick={increment}>Increase</button>

      <button onClick={decrement}>Decrease</button>
    </div>
  );
}

export default UsingContext;
