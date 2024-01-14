import React, { useState } from 'react';
import {
  RecoilRoot,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';
import {
  filterAtom,
  filteredTodosSelector,
  todosAtom,
} from './store/atoms/todos';

const TodosAppAssg = () => {
  return (
    <RecoilRoot>
      <div style={{ width: '100%', display: 'flex', gap: '2rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <TodosInput />
          <FilterTodosInput />
        </div>
        <TodosRenderer />
      </div>
    </RecoilRoot>
  );
};

const TodosInput = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const setTodosData = useSetRecoilState(todosAtom);

  const addTodoHandler = () => {
    setTodosData((todos) => [...todos, { title, desc }]);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder='Title'
      />
      <input
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder='Description'
      />
      <button onClick={addTodoHandler}>Add Todo</button>
    </div>
  );
};

const FilterTodosInput = () => {
  const setFilterVal = useSetRecoilState(filterAtom);
  return (
    <input
      onChange={(e) => setFilterVal(e.target.value)}
      placeholder='Filter by title'
    />
  );
};

const TodosRenderer = () => {
  const todos = useRecoilValue(filteredTodosSelector);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {todos.length > 0 &&
        todos.map((todo, idx) => {
          return (
            <div
              key={idx}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                border: '1px solid #ccc'
              }}
            >
              <span>{todo.title}</span>
              <span>{todo.desc}</span>
            </div>
          );
        })}
    </div>
  );
};

export default TodosAppAssg;
