import useTodos from './useTodos';
import Todo from '../Todo';

const UsingCustomHook = () => {
  const todos = useTodos();
  return (
    <div>
      <h1>Using Custom Hook</h1>
      {todos.map((todo) => {
        return (
          <Todo
            key={todo.id}
            title={todo.title}
            description={todo.description}
          />
        );
      })}
    </div>
  );
};

export default UsingCustomHook;
