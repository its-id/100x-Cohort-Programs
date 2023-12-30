import { useState } from 'react';

function App() {
  //state is one of the main features of react, it stores the data and re-renders the component on changing the state
  const [count, setCount] = useState(0);

  // const onClickHandler = () => {
  //   setCount(count + 1);
  // };

  return (
    <div>
      <CustomButton count={count} setCount={setCount} />
    </div>
  );

  //CustomButton is a child component used above
  //basically a cleaner way to write code
  function CustomButton(props) {
    //we are having the count state and its updation func in the props.
    const onClickHandler = () => {
      props.setCount(props.count + 1);
    };

    return <button onClick={onClickHandler}>Counter {props.count}</button>;
  }
}

export default App;
