import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Register.module.css';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Register = ({ setIsLogin }: any) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('user');
  const navigate = useNavigate();

  const checkValid = () => {
    if (
      email === '' ||
      password === '' ||
      username === '' ||
      confirmPassword === '' ||
      role === ''
    ) {
      toast.error('Please fill all fields');
      return false;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return false;
    }
    return true;
  };

  const handlRegister = async (e: any) => {
    e.preventDefault();
    console.log(username, email, password, confirmPassword, role)
    if (!checkValid()) return;
    const loadingToast = toast.loading('Registering...');
    try {
      const response = await axios.post('http://localhost:3001/signup', {
        username,
        email,
        password,
        role,
      });
      if (response.status === 201) {
        toast.success('Registered successfully');
        setIsLogin(true);
        toast.dismiss(loadingToast);
      } else {
        toast.error('Error registering');
        toast.dismiss(loadingToast);
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
      <h2 className={styles.authHeader}>Register</h2>
      <div className={styles.mainBody}>
        <input
          type='text'
          name='username'
          id='username'
          placeholder='username'
          onChange={(e) => setUsername(e.target.value)}
        />
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
        <input
          type='password'
          name='confirmPass'
          id='confirmPass'
          placeholder='confirm password'
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <select
          name='role'
          id='role'
          defaultValue={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value='user'>User</option>
          <option value='admin'>admin</option>
        </select>
        <div className={styles.authBtnContainer}>
          <button onClick={handlRegister}>Register</button>
        </div>

        <div className={styles.lowerAuthContainer}>
          Already have an account?{' '}
          <button onClick={() => setIsLogin(true)}>Login</button>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Register;
