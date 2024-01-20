import { useState } from 'react';
import UsingInternalCSS from './components/UsingInternalCSS';
import UsingTailwindFlex from './components/UsingTailwindFlex';
import UsingTailwindGrid from './components/UsingTailwindGrid';
import UsingDukaanComponents from './components/dukaan-components/UsingDukaanComponents';

function App() {
  return (
    <>
      {/* <UsingInternalCSS /> */}
      {/* <UsingTailwindFlex /> */}
      {/* <UsingTailwindGrid /> */}
      <UsingDukaanComponents />
    </>
  );
}

export default App;
