import { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import AuthContext from '../context/auth/AuthContext';
import { UserState } from '../types/user';

const PrivateRoute = () => {
  const { isAuthenticated } = useContext<UserState>(AuthContext);

  return isAuthenticated ? <Outlet /> : <Navigate to='/user/signin' />;
};

export default PrivateRoute;
