import useSWR from 'swr';
import useTodos from './useTodos';
import fetcher from './fetcher';

function DataFetchingHook() {
  //code looks cleaner now!
  // const {todos, loading} = useTodos(5);
  const { data, error, isLoading } = useSWR(
    'https://sum-server.100xdevs.com/todos',
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <>
      {data.todos.map((todo, idx) => (
        <Track key={`todo-${idx}`} todo={todo} />
      ))}

      {/* when the todos are getting fetched, loading will be true*/}
      {/* {loading ? (
        <div>Loading...</div>
      ) : (
        todos.map((todo, idx) => <Track key={`todo-${idx}`} todo={todo} />)
      )} */}
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
