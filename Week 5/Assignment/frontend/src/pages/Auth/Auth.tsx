import { useState } from 'react';
import Login from '../../components/AuthForm/Login/Login';
import Register from '../../components/AuthForm/Register/Register';
import styles from './Auth.module.css';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className={styles.container}>
      {isLogin ? (
        <Login setIsLogin={setIsLogin} />
      ) : (
        <Register setIsLogin={setIsLogin} />
      )}
    </div>
  );
};

export default Auth;
