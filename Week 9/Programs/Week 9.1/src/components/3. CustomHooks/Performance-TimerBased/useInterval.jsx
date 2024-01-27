import { useEffect, useState } from 'react';

const useInterval = (fn, timeout) => {
  useEffect(() => {
    const interval = setInterval(() => {
      fn();
    }, timeout);

    return () => {
      clearInterval(interval);
    };
  }, [fn, timeout]);
};

export default useInterval;
