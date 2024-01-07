import { useState } from 'react';

const UsingUseMemoHook = () => {
  const [counter, setCounter] = useState(0); //counter state's operation is independent of the inputValue state's operation
  const [inputValue, setInputValue] = useState(1);

  let count = 0;
  for (let i = 1; i <= inputValue; i++) {
    count += i;
  }

  const onChangeHandler = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <input
        type='number'
        onChange={onChangeHandler}
        placeholder='Find sum from 1 to n'
      />
      <p>
        Sum from 1 to {inputValue} is {count}
      </p>
      <button onClick={() => setCounter(counter + 1)}>Counter {counter}</button>
    </>
  );
};

export default UsingUseMemoHook;
