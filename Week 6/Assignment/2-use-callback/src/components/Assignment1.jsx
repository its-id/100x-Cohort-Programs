import { useCallback, memo, useState } from 'react';

// Create a counter component with increment and decrement functions. Pass these functions to a child component which has buttons to perform the increment and decrement actions. Use useCallback to ensure that these functions are not recreated on every render.

export function Assignment1() {
  const [count, setCount] = useState(0);

  // Your code starts here
  const handleIncrement = useCallback(() => {
    console.log('~~~Parent Increment called!~~~');
    setCount(count + 1);
  }, [count]);

  const handleDecrement = useCallback(() => {
    console.log('~~~Parent Decrement called!~~~');
    setCount(count - 1);
  }, [count]);
  // Your code ends here

  return (
    <div>
      <p>Count: {count}</p>
      <CounterButtons
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
      />
    </div>
  );
}

const CounterButtons = memo(({ onIncrement, onDecrement }) => {
  console.log('Child component re-rendered');
  return (
    <div>
      <span>Clicking below button re-renders child component as Parent's count state updates!</span>
      <br />
      <button onClick={onIncrement}>Increment</button>
      <button onClick={onDecrement}>Decrement</button>
    </div>
  );
});
