import { useState, useEffect } from 'react';

const useIsOnline = () => {
  const [isOnline, setIsOnline] = useState(window.navigator.onLine);

  useEffect(() => {
    window.addEventListener('online', () => {
      setIsOnline(true);
      console.log('Became online');
    });
    window.addEventListener('offline', () => {
      setIsOnline(false);
      console.log('Became offline');
    });
  }, []);

  return isOnline;
};

export default useIsOnline;
