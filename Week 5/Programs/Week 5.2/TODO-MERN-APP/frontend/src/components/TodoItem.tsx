import { Todo } from '../types/todo';

type CompleteTodoHandler = (id: string) => void;

const TodoItem = ({
  todo,
  markAsDone,
}: {
  todo: Todo;
  markAsDone: CompleteTodoHandler;
}) => {
  return (
    <div className='single-todo'>
      <div className={`todo-main ${todo.completed ? 'todo-done' : ''}`}>
        <p className='todo-title'>{todo.title}</p>
        <p>:</p>
        <p>{todo.description}</p>
      </div>
      <button
        disabled={todo.completed}
        className={`todo-btn ${todo.completed ? 'btn-disabled' : ''}`}
        onClick={() => markAsDone(todo._id)}
      >
        Mark as Done
      </button>
    </div>
  );
};

export default TodoItem;
