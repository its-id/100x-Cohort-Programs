import { useState, useMemo } from 'react';

const UsingUseMemoHook = () => {
  const [counter, setCounter] = useState(0); //counter state's operation is independent of the inputValue state's operation
  const [inputValue, setInputValue] = useState(1);

  //we wrap it under useMemo hook so that it doesn't run everytime the component re-renders

  const count = useMemo(() => {
    console.log('Memo called');
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
