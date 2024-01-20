import { useState } from 'react';
import UsingInternalCSS from './components/UsingInternalCSS';
import UsingTailwindFlex from './components/UsingTailwindFlex';
import UsingTailwindGrid from './components/UsingTailwindGrid';

function App() {
  return (
    <>
      {/* <UsingInternalCSS /> */}
      {/* <UsingTailwindFlex /> */}
      <UsingTailwindGrid />
    </>
  );
}

export default App;
