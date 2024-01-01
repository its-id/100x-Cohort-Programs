import { Todo } from '../types/todo';
import Button from './common/Button';

type CompleteTodoHandler = (id: string) => void;

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

const TodoItem = ({
  todo,
  markAsDone,
}: {
  todo: Todo;
  markAsDone: CompleteTodoHandler;
}) => {
  return (
    <div className='flex items-center justify-between py-2 px-4 rounded-lg border border-slate-300 mb-2 gap-4'>
      <div
        className={classNames(
          todo.completed ? 'line-through text-slate-300' : '',
          'w-[70%] flex items-center gap-4'
        )}
      >
        <p className='font-extrabold uppercase'>{todo.title}</p>
        <p>:</p>
        <p>{todo.description}</p>
      </div>
      <div className='w-fit'>
        <Button
          variant='success'
          text='Mark as Done'
          disabled={todo.completed}
          onClick={() => markAsDone(todo._id)}
        ></Button>
      </div>
    </div>
  );
};

export default TodoItem;
