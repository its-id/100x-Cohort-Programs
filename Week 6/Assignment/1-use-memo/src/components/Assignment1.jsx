import { useMemo, useState } from "react";

// In this assignment, your task is to create a component that performs an expensive calculation (finding the factorial) based on a user input. 
// Use useMemo to ensure that the calculation is only recomputed when the input changes, not on every render.

export default function Assignment1() {
    const [counter, setCounter] = useState(0);
    const [input, setInput] = useState(0);
    // Your solution starts here

    //finding factorial
    const expensiveValue = useMemo(() => {
      console.log('inside expensive operation');
      let fact = 1;
      for (let i = 1; i <= input; i++) {
        fact *= i;
      }
      return fact;
    }, [input]);

    // Your solution ends here

    return (
      <div>
        <span>
          Clicking below button should not run the expensive operation
        </span><br />
        <button onClick={() => setCounter(counter + 1)}>
          Counter ({counter})
        </button>
        <br/><br/>
        <input
          type='number'
          placeholder='Enter number to find factorial'
          value={input}
          onChange={(e) => setInput(Number(e.target.value))}
        />
        <p>Calculated Value: {expensiveValue}</p>
      </div>
    );
}