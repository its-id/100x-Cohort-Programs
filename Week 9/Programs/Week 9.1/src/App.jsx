// import {
//   ClassBasedComponent,
//   FunctionalComponent,
// } from './components/1. ClassvsFunctional';

// import {
//   UnderstandingClassBasedMethods,
//   UnderstandingUseEffect,
// } from './components/2. UnderstandingLifeCycleEvents';

import { BrowserFuncHook, DataFetchingHook } from './components/3. CustomHooks';
import PerformanceTimerBased from './components/3. CustomHooks/Performance-TimerBased/PerformanceTimerBased';

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

      {/* <DataFetchingHook /> */}
      {/* <BrowserFuncHook /> */}
      <PerformanceTimerBased />


    </div>
  );
}

export default App;
