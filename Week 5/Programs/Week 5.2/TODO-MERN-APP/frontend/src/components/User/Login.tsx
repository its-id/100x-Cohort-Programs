import { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

//components imports
import Button from '../common/Button';
import Input from '../common/Input';

//types imports
import { User, UserState } from '../../types/user';

//context imports
import AuthContext from '../../context/auth/AuthContext';

const Login = ({ context: path }: any) => {
  const navigate = useNavigate();

  const [user, setUser] = useState<User>({
    email: '',
    password: '',
  });

  const { isAuthenticated, error, clearError, signin } =
    useContext<UserState>(AuthContext);

  const checkValid = () => {
    if (
      user.email === '' ||
      user.password === '' ||
      user.confirmPassword === '' ||
      user.username === ''
    ) {
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loadingToast = toast.loading('Logging In...', {
      style: {
        background: '#333',
        color: '#fff',
      },
    });

    if (!checkValid() || !signin) {
      toast.dismiss(loadingToast);
      return;
    }

    try {
      await signin(user);
      if (!error) {
        toast.success('Logged in Successfully', {
          style: {
            background: '#333',
            color: '#fff',
          },
        });
      }
      toast.dismiss(loadingToast);
    } catch (err: any) {
      toast.dismiss(loadingToast);
    }
  };

  const onInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, path]);

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
    <>
      <div className='min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
          <h2 className='mt-6 text-center text-3xl font-bold text-slate-200'>
            Sign in to save your TODOs
          </h2>
        </div>

        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
          <div className='bg-gray-600/50 py-8 px-4 shadow sm:rounded-lg sm:px-10'>
            <div className='flex flex-col gap-6'>
              <div>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium text-slate-200'
                >
                  Email address
                </label>
                <div className='mt-1'>
                  <Input
                    id='email'
                    name='email'
                    type='email'
                    variant='dark'
                    autoComplete='email'
                    onChange={onInputChangeHandler}
                  />
                </div>
              </div>
              <p className='-mt-4 text-sm text-slate-400'>
                Only accepting Gmail, Yahoo and Outlook emails
              </p>

              <div>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium text-gray-200'
                >
                  Password
                </label>
                <div className='mt-1'>
                  <Input
                    id='password'
                    name='password'
                    type='password'
                    variant='dark'
                    autoComplete='current-password'
                    onChange={onInputChangeHandler}
                  />
                </div>
              </div>

              <div>
                <Button
                  text='Sign In'
                  onClick={handleSubmit}
                  variant='success'
                />
              </div>

              <div className='text-sm'>
                <Link
                  to='/user/signup'
                  className='text-emerald-400 hover:text-emerald-500'
                >
                  Don't have an account? Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default Login;
