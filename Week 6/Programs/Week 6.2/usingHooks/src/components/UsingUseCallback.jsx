import { useState, memo, useCallback } from 'react';

const UsingUseCallback = () => {
  const [count, setCount] = useState(0);

  //whenever we click on the child component, the parent component re-renders, even though the child is wrapper under memo() and the prop function is not changing.
  //   const onClickHandler = () => {
  //     console.log('Button clicked');
  //   };
  //This is because the function is created again and again with different REFERENTIAL EQUALITY on every re-render. To prevent this, we use useCallback hook
  const onClickHandler = useCallback(() => {
    console.log('Button clicked');
  });

  return (
    <>
      <button onClick={() => setCount(count + 1)}>Button inside Parent</button>
      <br />
      <br />
      <ChildComponent onclick={onClickHandler} />
    </>
  );
};

const ChildComponent = memo(({ onclick }) => {
  console.log('Child component re-rendered');
  return <button onClick={onclick}>Button inside Child</button>;
});

export default UsingUseCallback;
