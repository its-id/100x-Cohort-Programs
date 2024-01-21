import './App.css';
import UsingCustomHook from './components/4. Using CustomHook/UsingCustomHook';
import UsingUseCallback from './components/3. Using useCallback/UsingUseCallback';
import UsingUseEffectHook2 from './components/1. Using useEffect/UsingUseEffectHook2';
import UsingUseEffectHook from './components/1. Using useEffect/UsingUseEffectHook';
import UsingUseMemoHook from './components/2. Using useMemo/UsingUseMemoHook';
import UsingUseRef from './components/5. Using useRef/UsingUseRef';

function App() {
  return (
    <>
      {/* <UsingUseEffectHook /> */}
      {/* <UsingUseEffectHook2 /> */}
      {/* <UsingUseMemoHook /> */}
      {/* <UsingUseCallback /> */}
      {/* <UsingCustomHook /> */}
      <UsingUseRef />
    </>
  );
}

export default App;
