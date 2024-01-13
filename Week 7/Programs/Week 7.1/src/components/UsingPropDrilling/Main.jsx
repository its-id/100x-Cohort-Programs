import { useState } from 'react';

function Main() {
  const [count, setCount] = useState(0);

  return (
    <div>
      {/* even <Count> component doesn't need the 'setCount' prop, but we need it as have to pass it down to <Buttons> component.  */}
      <Count count={count} setCount={setCount} />
    </div>
  );
}

function Count({ count, setCount }) {
 
  return (
    <div>
      {count}
      <Buttons count={count} setCount={setCount} />
    </div>
  );
}

function Buttons({ count, setCount }) {
  return (
    <div>
      <button onClick={() => {}}>Increase</button>
      <button onClick={() => {}}>Decrease</button>
    </div>
  );
}

export default Main;
