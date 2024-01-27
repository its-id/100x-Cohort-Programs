import useTodos from "./useTodos";

function DataFetchingHook() {

  //code looks cleaner now!
  const todos = useTodos();
  
  return (
    <>
      {todos.map((todo, idx) => (
        <Track key={`todo-${idx}`} todo={todo} />
      ))}
    </>
  );
}

function Track({ todo }) {
  return (
    <div>
      {todo.title}
      <br />
      {todo.description}
    </div>
  );
}

export default DataFetchingHook;
