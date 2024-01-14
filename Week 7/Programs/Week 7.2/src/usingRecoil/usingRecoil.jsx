import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { countAtom } from './store/atoms/count';

function UsingRecoil() {
  return (
    <div>
      <Count />
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
  return <div>{count}</div>;
}

function Buttons() {
  const [count, setCount] = useRecoilState(countAtom);
  return (
    <div>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Increase
      </button>

      <button
        onClick={() => {
          setCount(count - 1);
        }}
      >
        Decrease
      </button>
    </div>
  );
}

export default UsingRecoil;
