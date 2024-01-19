import React, { useState, useMemo } from 'react';
// You have been given a list of items you shopped from the grocery store
// You need to calculate the total amount of money you spent

const Assignment3 = () => {
  const [counter, setCounter] = useState(0);
  const [items, setItems] = useState([
  { name: 'Chocolates', value: 10 },
  { name: 'Chips', value: 20 },
  { name: 'Onion', value: 30 },
  { name: 'Tomato', value: 30 },
  // Add more items as needed
]);

  // Your code starts here
  const totalValue = useMemo(() => {
    console.log('inside expensive operation');
    let total = 0;
    for (let i = 0; i < items.length; i++) {
      total += items[i].value;
    }
    return total;
  }, [items]);

  // Your code ends here
  return (
    <div>
      <span>Clicking below button should not run the expensive operation</span><br />
      <button onClick={() => setCounter(counter + 1)}>
        Counter ({counter})
      </button>
      <br />
      <br />
      <button onClick={() => setItems([...items, { name: 'New Item', value: 10 }])}> Add new item </button>
      <ul>
        {items.map((item, index) => {
          return (
            <li key={index}>
              {item.name} - Price: ${item.value}
            </li>
          );
        })}
      </ul>
      <p>Total Value: {totalValue}</p>
    </div>
  );
};

export default Assignment3;
