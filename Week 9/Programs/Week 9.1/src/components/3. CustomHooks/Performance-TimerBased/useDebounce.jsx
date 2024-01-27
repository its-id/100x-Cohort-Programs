import { useEffect, useState } from 'react';

//makes sure a certain delay is given when a rapid change is made
const useDebounce = (inputValue, delay) => {
  const [debouncedValue, setDebouncedValue] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      console.log('API Call Made!');
      setDebouncedValue(inputValue);
    }, delay);

    //if the input changes quickly, clear the old timeout and start a new one
    return () => clearTimeout(timeout);
  }, [inputValue, delay]);

  return debouncedValue;
};

export default useDebounce;
