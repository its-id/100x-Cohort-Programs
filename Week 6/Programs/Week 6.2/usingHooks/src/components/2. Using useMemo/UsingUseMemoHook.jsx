import { useState, useMemo } from 'react';

const UsingUseMemoHook = () => {
  const [counter, setCounter] = useState(0); //counter state's operation is independent of the inputValue state's operation
  const [inputValue, setInputValue] = useState(1);

  //we wrap it under useMemo hook so that it doesn't run everytime the component re-renders

  const count = useMemo(() => {
    console.log('Expensive operation');
    let finalCount = 0;
    for (let i = 1; i <= inputValue; i++) {
      finalCount += i;
    }
    return finalCount;
  }, [inputValue]); //ensures this function runs only when the inputValue changes

  const onChangeHandler = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <h1>Using useMemo Hook</h1>
      <span>Enter value to run expensive operation </span>
      <input
        type='number'
        onChange={onChangeHandler}
        placeholder='Find sum from 1 to n'
      />
      <p>
        Sum from 1 to {inputValue} is {count}
      </p>
      <div>
        <span>Clicking it should not run the expensive operation </span>
        <button onClick={() => setCounter(counter + 1)}>
          Click Me to change counter ({counter})
        </button>
      </div>
    </>
  );
};

export default UsingUseMemoHook;
