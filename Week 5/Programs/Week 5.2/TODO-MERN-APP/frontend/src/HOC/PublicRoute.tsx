import { useContext } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import AuthContext from '../context/auth/AuthContext';
import { UserState } from '../types/user';

const PublicRoute = () => {
  const { isAuthenticated } = useContext<UserState>(AuthContext);
  const location = useLocation();

  return isAuthenticated ? (
    <Navigate to='/' />
  ) : (
    <Outlet context={location.pathname} />
  );
};

export default PublicRoute;
