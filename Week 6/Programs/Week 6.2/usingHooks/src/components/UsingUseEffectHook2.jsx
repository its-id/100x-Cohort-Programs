import React, { useState } from 'react';
import TodosById from './TodosById';

const UsingUseEffectHook2 = () => {
  const [selectedId, setSelectedId] = useState(1);

  return (
    <>
      <p>Get Todo with ID</p>
      <div>
        {Array.from({ length: 5 }, (_, i) => (
          <button key={i} onClick={() => setSelectedId(i + 1)}>
            {i + 1}
          </button>
        ))}
      </div>
      <TodosById id={selectedId} />
    </>
  );
};

export default UsingUseEffectHook2;
