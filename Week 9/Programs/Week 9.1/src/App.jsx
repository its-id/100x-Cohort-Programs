// import {
//   ClassBasedComponent,
//   FunctionalComponent,
// } from './components/1. ClassvsFunctional';

import {
  UnderstandingClassBasedMethods,
  UnderstandingUseEffect,
} from './components/2. UnderstandingLifeCycleEvents';

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
      <UnderstandingClassBasedMethods />
    </div>
  );
}

export default App
