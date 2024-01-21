import { useContext, useState } from 'react';
import { CountContext } from './Context';

function App() {
  //although the state is still inside the parent component, the teleporting part is handled now by the context API, instead of prop drilling.
  const [count, setCount] = useState(0);

  return (
    //to make sure any components that wants to use the teleported state or able to teleport the state, we need to wrap them in <CountContext.Provider> component.

    <CountContext.Provider value={{ count }}>
      <div>
        <Count setCount={setCount}/>
      </div>
    </CountContext.Provider>
  );
}

function Count({setCount}) {
  return (
    <div>
      <CountRenderer />
      <Buttons setCount={setCount}/>
    </div>
  );
}

function CountRenderer() {
  //we directly teleport the count state from context here
  const count = useContext(CountContext);

  return <div>{count}</div>;
}

function Buttons({setCount}) {
  const {count} = useContext(CountContext);

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

export default App;
