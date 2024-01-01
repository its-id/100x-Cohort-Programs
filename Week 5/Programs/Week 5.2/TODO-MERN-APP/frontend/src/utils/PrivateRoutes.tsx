import { useContext, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import AuthContext from '../components/context/auth/AuthContext';
import { UserState } from '../types/user';

const PrivateRoutes = () => {
  const { isAuthenticated, loadUser } = useContext<UserState>(AuthContext);

  // useEffect(() => {
  //   if (isAuthenticated === null) loadUser();
  // }, [isAuthenticated]);

  return isAuthenticated ? <Outlet /> : <Navigate to='/user/signin' />;
};

export default PrivateRoutes;
