import { useEffect, useState } from 'react';
import useInterval from './useInterval';
import useDebounce from './useDebounce';

function PerformanceTimerBased() {
  const [count, setCount] = useState(0);

  const [inputValue, setInputValue] = useState('');
  const debouncedValue = useDebounce(inputValue, 500); // 500 milliseconds debounce delay

  // Use the debouncedValue in your component logic, e.g., trigger a search API call via a useEffect

  useInterval(() => {
    setCount((c) => c + 1);
  }, 1000);

  return (
    <>
      <span>Timer is at {count}</span>
      <input
        type='text'
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder='Search...'
      />
      <span>Debounced Value used for calling on API 👉 {debouncedValue}</span>
    </>
  );
}

export default PerformanceTimerBased;
