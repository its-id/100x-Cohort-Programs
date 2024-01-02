import { Todo } from '../../types/todo';
import Button from '../common/Button';

import binIcon from '../../assets/bin.svg';

type CompleteTodoHandler = (id: string) => void;

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

const TodoItem = ({
  todo,
  id,
  markAsDone,
  deleteTodoHandler,
}: {
  todo: Todo;
  id: string;
  markAsDone: CompleteTodoHandler;
  deleteTodoHandler: CompleteTodoHandler;
}) => {
  return (
    <div className='flex items-center justify-between py-2 px-4 rounded-lg bg-gray-700 border border-slate-400 mb-2 gap-4'>
      <div
        className={classNames(
          todo.completed ? 'line-through text-slate-300' : '',
          'w-[70%] flex items-center gap-4'
        )}
      >
        <p className='font-extrabold uppercase max-w-[25%]'>{todo.title}</p>
        <p>:</p>
        <p className='max-w-[60%]'>{todo.description}</p>
      </div>
      <div className='flex gap-4 items-center flex-end'>
        <img
          src={binIcon}
          alt='delete'
          className='w-7 h-7 cursor-pointer'
          onClick={() => deleteTodoHandler(id)}
        />

        <Button
          variant='success'
          text='Mark as Done'
          styleClass='w-fit'
          disabled={todo.completed}
          onClick={() => markAsDone(id)}
        ></Button>
      </div>
    </div>
  );
};

export default TodoItem;
