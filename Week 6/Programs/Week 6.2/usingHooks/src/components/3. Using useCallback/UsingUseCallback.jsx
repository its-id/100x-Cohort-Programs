import { useState, memo, useCallback } from 'react';

const UsingUseCallback = () => {
  const [count, setCount] = useState(0);

  //whenever we click on the child component, the child component re-renders, even though the child is wrapped under memo() and the prop "function" is not changing.
  //   const onClickHandler = () => {
  //     console.log('Button clicked');
  //   };
  //This is because the function is created again and again with different REFERENTIAL EQUALITY on every re-render. To prevent this, we use useCallback hook
  const onClickHandler = useCallback(() => {
    console.log('Parent function called!');
  });//ensures that the function is created only once and the same function is used on every click

  return (
    <>
      <h1>Using useCallback Hook</h1>
      <button onClick={() => setCount(count + 1)}>
        Parnet - Click me. (Child component should re-render)
      </button>
      <br />
      <br />
      <ChildComponent onclick={onClickHandler} />
    </>
  );
};

const ChildComponent = memo(({ onclick }) => {
  console.log('Child component re-rendered');
  return (
    <button onClick={onclick}>
      Child - Click me. (Child component should not re-render)
    </button>
  );
});

export default UsingUseCallback;
