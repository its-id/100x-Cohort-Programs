// import {
//   ClassBasedComponent,
//   FunctionalComponent,
// } from './components/1. ClassvsFunctional';

// import {
//   UnderstandingClassBasedMethods,
//   UnderstandingUseEffect,
// } from './components/2. UnderstandingLifeCycleEvents';

import { DataFetchingHook } from './components/3. CustomHooks';

function App() {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* <ClassBasedComponent /> */}
      {/* <FunctionalComponent /> */}

      {/* <UnderstandingUseEffect /> */}
      {/* <UnderstandingClassBasedMethods /> */}


      <DataFetchingHook />
    </div>
  );
}

export default App
