import { useState } from 'react';
import UsingInternalCSS from './components/UsingInternalCSS/UsingInternalCSS';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <UsingInternalCSS />
    </>
  );
}

export default App;
