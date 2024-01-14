import {
  RecoilRoot,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
  //   useSetRecoilState,
} from 'recoil';
import { countAtom } from './store/atoms/count';

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
    </div>
  );
}

function CountRenderer() {
  //   const [count, setCount] = useRecoilState(countAtom); //to get both value and func to update it.
  const count = useRecoilValue(countAtom); //to only get the value. good for performance
  //   const setCount = useSetRecoilState(countAtom); //to only set the value.
  return (
    <div style={{ textAlign: 'center', marginBottom: '10px' }}>{count}</div>
  );
}

function Buttons() {
  const setCount = useSetRecoilState(countAtom);

  //now this component will stop re-rendering
  return (
    <div>
      <button
        onClick={() => {
          setCount(count => count + 1);
        }}
      >
        Increase
      </button>

      <button
        onClick={() => {
          setCount(count => count - 1);
        }}
      >
        Decrease
      </button>
    </div>
  );
}

export default UsingRecoil;
