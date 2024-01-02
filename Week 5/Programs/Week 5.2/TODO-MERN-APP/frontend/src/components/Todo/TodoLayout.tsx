import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

//components imports
import Input from '../common/Input.tsx';
import Button from '../common/Button.tsx';
import TodoItem from './TodoItem.tsx';
import TodosLoader from './TodosLoader.tsx';

//types imports
import { UserState } from '../../types/user.ts';
import { Todo, TodoState } from '../../types/todo.ts';

//context imports
import AuthContext from '../../context/auth/AuthContext.tsx';
import TodoContext from '../../context/todo/TodoContext.ts';

//icons imports
import twitterIcon from '../../assets/twitter.svg';
import githubIcon from '../../assets/github.svg';

const TodoLayout = () => {
  const navigate = useNavigate();
  // const [id, setId] = useState<string>('0');
  const [currTodo, setCurrTodo] = useState<Todo>({
    title: '',
    description: '',
    completed: false,
  });
  const { logout }: UserState = useContext(AuthContext);
  const {
    todos,
    todoLoading,
    loading,
    error,
    getTodos,
    createTodo,
    markComplete,
    deleteTodo,
    clearError,
  } = useContext<TodoState>(TodoContext);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrTodo({
      ...currTodo,
      [e.target.name]: e.target.value,
    });
  };

  const checkValid = () => {
    if (currTodo.title === '' || currTodo.description === '') {
      toast.error('Please fill all the fields', {
        style: {
          background: '#333',
          color: '#fff',
        },
      });
      return false;
    }

    return true;
  };

  const clearCurrTodo = () => {
    setCurrTodo({
      title: '',
      description: '',
      completed: false,
    });
  };

  const addTodoHandler = async () => {
    const loadingToast = toast.loading('Adding Todo...', {
      style: {
        background: '#333',
        color: '#fff',
      },
    });
    try {
      if (!checkValid()) {
        toast.dismiss(loadingToast);
        return;
      }

      if (!createTodo) {
        toast.error('Something went wrong', {
          style: {
            background: '#333',
            color: '#fff',
          },
        });
        return;
      }

      createTodo(currTodo);
      if (!error) {
        toast.success('Todo Added Successfully', {
          style: {
            background: '#333',
            color: '#fff',
          },
        });
        toast.dismiss(loadingToast);
        clearCurrTodo();
      }
    } catch (err) {
      toast.error(error as string, {
        style: {
          background: '#333',
          color: '#fff',
        },
      });
    }
  };

  const markCompleteHandler = async (id: string) => {
    try {
      const loadingToast = toast.loading('Marking Todo as Done...', {
        style: {
          background: '#333',
          color: '#fff',
        },
      });

      if (!markComplete) {
        toast.error('Something went wrong', {
          style: {
            background: '#333',
            color: '#fff',
          },
        });
        return;
      }

      markComplete(id);
      if (!error && !loading) {
        toast.success('Todo Marked as Done Successfuly', {
          style: {
            background: '#333',
            color: '#fff',
          },
        });
        toast.dismiss(loadingToast);
      }
    } catch (err) {
      toast.error(error as string, {
        style: {
          background: '#333',
          color: '#fff',
        },
      });
    }
  };

  const deleteTodoHandler = async (id: string) => {
    try {
      const loadingToast = toast.loading('Deleting Todo...', {
        style: {
          background: '#333',
          color: '#fff',
        },
      });

      if (!deleteTodo) {
        toast.error('Something went wrong', {
          style: {
            background: '#333',
            color: '#fff',
          },
        });
        return;
      }

      deleteTodo(id);
      if (!error && !loading) {
        toast.success('Todo Deleted Successfuly', {
          style: {
            background: '#333',
            color: '#fff',
          },
        });
        toast.dismiss(loadingToast);
      }
    } catch (err) {
      toast.error(error as string, {
        style: {
          background: '#333',
          color: '#fff',
        },
      });
    }
  };

  const logoutHandler = () => {
    logout();
    toast.success('Logged out Successfully', {
      style: {
        background: '#333',
        color: '#fff',
      },
    });
    navigate('/user/signin');
  };

  useEffect(() => {
    getTodos && getTodos();
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        style: {
          background: '#333',
          color: '#fff',
        },
      });
      if (clearError) {
        clearError();
      }
    }
  }, [error]);

  return (
    <div className='w-[100vw]'>
      <div className='w-full flex justify-center text-center my-8'>
        <p className='font-bold text-4xl'>TODO App</p>
      </div>
      <div className='absolute flex justify-center space-x-6 top-8 right-8'>
        <Link to='https://twitter.com/its_ikD' target='_blank'>
          <img src={twitterIcon} alt='twitter' className='w-10 h-10' />
        </Link>
        <Link to='#' target='_blank'>
          <img src={githubIcon} alt='github' className='w-10 h-10' />
        </Link>
        <Button
          text='Logout'
          styleClass='py-1'
          onClick={logoutHandler}
          variant='danger'
        />
      </div>
      <div className='flex w-[95%] mx-auto gap-8'>
        <div className='add-todo-container w-1/4'>
          <Input
            type='text'
            name='title'
            value={currTodo.title}
            placeholder='Enter Todo Title'
            styleClass='mb-4 shadow-md shadow-emerald-700'
            onChange={onInputChange}
          />
          <Input
            type='text'
            name='description'
            value={currTodo.description}
            placeholder='Enter Todo Description'
            styleClass='mb-4 shadow-md shadow-emerald-700'
            onChange={onInputChange}
          />
          <Button text='Add Todo' onClick={addTodoHandler} />
        </div>
        <div className='w-3/4 max-h-[95vh] flex flex-col gap-4'>
          {todoLoading ? (
            <TodosLoader />
          ) : (
            todos &&
            todos?.length > 0 &&
            todos.map((todo, idx) => {
              return (
                <TodoItem
                  key={idx}
                  todo={todo}
                  id={todo._id as string}
                  deleteTodoHandler={deleteTodoHandler}
                  markAsDone={markCompleteHandler}
                />
              );
            })
          )}
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default TodoLayout;
