import './App.css';
import UsingCustomHook from './components/UsingCustomHook';
import UsingUseCallback from './components/UsingUseCallback';
import UsingUseEffectHook2 from './components/UsingUseEffectHook2';
import UsingUseEffectHook from './components/UsinguseEffectHook';
import UsingUseMemoHook from './components/usingUseMemoHook';

function App() {
  return (
    <>
      {/* <UsingUseEffectHook /> */}
      {/* <UsingUseEffectHook2 /> */}
      {/* <UsingUseMemoHook /> */}
      {/* <UsingUseCallback /> */}
      <UsingCustomHook />
    </>
  );
}

export default App;
