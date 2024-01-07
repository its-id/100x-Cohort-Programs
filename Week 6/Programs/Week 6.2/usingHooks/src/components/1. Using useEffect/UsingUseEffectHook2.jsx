import React, { useState } from 'react';
import TodosById from './TodosById';

const UsingUseEffectHook2 = () => {
  const [selectedId, setSelectedId] = useState(1);

  return (
    <>
      <h1>Using useEffect Hook - Example 2</h1>
      <p>Get Todo with ID</p>
      <div>
        {Array.from({ length: 5 }, (_, i) => (
          <button
            style={{ marginRight: '1rem' }}
            key={i}
            onClick={() => setSelectedId(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <TodosById id={selectedId} />
    </>
  );
};

export default UsingUseEffectHook2;
