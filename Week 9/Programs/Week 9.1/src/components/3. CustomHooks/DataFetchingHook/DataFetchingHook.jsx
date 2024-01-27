import useTodos from './useTodos';

function DataFetchingHook() {
  //code looks cleaner now!
  const {todos, loading} = useTodos();

  return (
    <>
      {/* when the todos are getting fetched, loading will be true*/}
      {loading ? (
        <div>Loading...</div>
      ) : (
        todos.map((todo, idx) => <Track key={`todo-${idx}`} todo={todo} />)
      )}
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
