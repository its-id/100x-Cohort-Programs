import { useState, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

//components imports
import Button from '../common/Button';
import Input from '../common/Input';

//types imports
import { User, UserState } from '../../types/user';

//context imports
import AuthContext from '../../context/auth/AuthContext';

const Signup = ({ context: path }: any) => {
  const navigate = useNavigate();

  const [user, setUser] = useState<User>({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
  });
  const [registering, setRegistering] = useState(false);

  const { isAuthenticated, error, clearError, signup } =
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

    if (user.password !== user.confirmPassword) {
      toast.error('Passwords do not match', {
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
    const loadingToast = toast.loading('Signing Up...', {
      style: {
        background: '#333',
        color: '#fff',
      },
    });
    if (!checkValid()) {
      toast.dismiss(loadingToast);
      return;
    }

    setRegistering(true);
    try {
      signup &&
        (await signup({
          email: user.email,
          password: user.password,
          username: user.username,
        }));

      if (!error) {
        toast.success('Signed Up Successfully', {
          style: {
            background: '#333',
            color: '#fff',
          },
        });
        console.log('success', error);
        toast.dismiss(loadingToast);
      }
    } catch (err: any) {
      toast.dismiss(loadingToast);
    }

    // if (error) {
    //   console.log('error', error);
    //   toast.dismiss(loadingToast);
    //   toast.error(`${error} <- from signup` || 'Some error occurred', {
    //     style: {
    //       background: '#333',
    //       color: '#fff',
    //     },
    //   });
    // } else {
    //   toast.success('Signed Up Successfully', {
    //     style: {
    //       background: '#333',
    //       color: '#fff',
    //     },
    //   });
    //   console.log('success', error);
    //   toast.dismiss(loadingToast);
    //   navigate('/');
    // }
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
      setRegistering(false);
      toast.error(error, {
        style: {
          background: '#333',
          color: '#fff',
        },
      });
      clearError && clearError();
    }
  }, [error]);

  return (
    <>
      <div className='min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
          <h2 className='mt-6 text-center text-3xl font-bold text-slate-200'>
            Sign UP to save your TODOs
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
                  Username
                </label>
                <div className='mt-1'>
                  <Input
                    id='username'
                    name='username'
                    type='text'
                    variant='dark'
                    onChange={onInputChangeHandler}
                  />
                </div>
              </div>

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
                <label
                  htmlFor='confirm-password'
                  className='block text-sm font-medium text-gray-200'
                >
                  Confirm Password
                </label>
                <div className='mt-1'>
                  <Input
                    id='confirmPassword'
                    name='confirmPassword'
                    type='password'
                    variant='dark'
                    autoComplete='current-password'
                    onChange={onInputChangeHandler}
                  />
                </div>
              </div>

              <div>
                <Button
                  text={registering ? 'Logging In..' : 'Log In'}
                  variant='success'
                  onClick={handleSubmit}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default Signup;
