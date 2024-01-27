import React, { useEffect, useState } from 'react';

function UnderstandingUseEffect() {
  const [render, setRender] = useState(false);

  useEffect(() => {
    console.log('component mounted');

    //to run state update after 5s
    setTimeout(() => {
      setRender(true);
    }, 5000);

    return () => console.log('component unmounted');
  }, []);

  return <>{render ? 'Rendered!' : 'Not Yet Rendered'}</>;
}

export default UnderstandingUseEffect;
