import { useState, useEffect } from 'react';

const useIsOnline = () => {
  const [isOnline, setIsOnline] = useState(window.navigator.onLine);

  const handleMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

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
