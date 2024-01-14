import {
  RecoilRoot,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
  //   useSetRecoilState,
} from 'recoil';
import { countAtom, evenSelector } from './store/atoms/count';

function UsingRecoil() {
  return (
    <div>
      <RecoilRoot>
        <Count />
      </RecoilRoot>
    </div>
  );
}

function Count() {
  console.log('This component should not re-render!');
  return (
    <div>
      <CountRenderer />
      <Buttons />
      <EvenCountRenderer />
    </div>
  );
}

function CountRenderer() {
  //   const [count, setCount] = useRecoilState(countAtom); //to get both value and func to update it.
  const count = useRecoilValue(countAtom); //to only get the value. good for performance
  //   const setCount = useSetRecoilState(countAtom); //to only set the value.
  return (
    <div style={{ textAlign: 'center', marginBottom: '10px' }}>
      <span>{count}</span>
    </div>
  );
}

function EvenCountRenderer() {
  const count = useRecoilValue(countAtom);

  //METHOD 1: using useMemo() by REACT
  const isEven = useMemo(() => {
    return count % 2 == 0; //this logic only runs when count changes
  }, [count]);

  //METHOD 2: using selector by RECOIL
  // const isEven = useRecoilValue(evenSelector);

  return (
    <div style={{ textAlign: 'center', marginTop: '10px' }}>
      <span>{isEven && 'It is even'}</span>
    </div>
  );
}

function Buttons() {
  const setCount = useSetRecoilState(countAtom);

  //now this component will stop re-rendering
  return (
    <div>
      <button
        onClick={() => {
          setCount((count) => count + 1);
        }}
      >
        Increase
      </button>

      <button
        onClick={() => {
          setCount((count) => count - 1);
        }}
      >
        Decrease
      </button>
    </div>
  );
}

export default UsingRecoil;
