import useTodos from './CustomHook/useTodos';
import Todo from './Todo';

const UsingCustomHook = () => {
  const todos = useTodos();
  return (
    <div>
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
