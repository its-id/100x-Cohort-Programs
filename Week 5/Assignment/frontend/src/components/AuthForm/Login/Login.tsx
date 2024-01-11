import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Login.module.css';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsLogin }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const checkValid = () => {
    if (email === '' || password === '') {
      toast.error('Please fill all fields');
      return false;
    }
    return true;
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    if (!checkValid()) return;
    const loadingToast = toast.loading('Signing in...');
    try {
      //
      const response = await axios.post('http://localhost:3001/login', {
        email,
        password,
      });
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', response.data.role);
        toast.success('Logged in successfully');
        navigate('/');
        toast.dismiss(loadingToast);
      } else {
        console.log('error');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/');
    }
  }, [localStorage.getItem('token')]);

  return (
    <div className={styles.container}>
      <h2 className={styles.authHeader}>Login</h2>
      <div className={styles.mainBody}>
        <input
          type='email'
          name='email'
          id='email'
          placeholder='email'
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='password'
          name='pass'
          id='pass'
          placeholder='password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className={styles.authBtnContainer}>
          <button onClick={handleLogin}>Login</button>
        </div>

        <div className={styles.lowerAuthContainer}>
          Don't have an account?{' '}
          <button onClick={() => setIsLogin(false)}>Register</button>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Login;
