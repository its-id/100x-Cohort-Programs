function App() {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Todo title='Learn React' description='Learn React' done={false} />
      <Todo
        title='Learn TypeScript'
        description='Learn TypeScript'
        done={false}
      />
    </div>
  );
}

interface TodoProp {
  title: string;
  description: string;
  done: boolean;
}

//providing a type to the props
//we can also use 'any' which is not recommended.
function Todo(props: TodoProp) {
  return (
    <div
      style={{
        backgroundColor: 'lightblue',
        color: "black",
        padding: '10px',
        margin: '10px',
        borderRadius: '5px',
        width: '300px',
      }}
    >
      <h2>{props.title}</h2>
      <p>{props.description}</p>
      <p>{props.done ? 'Done' : 'Not Done'}</p>
    </div>
  );
}

export default App;
