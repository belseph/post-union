import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface Props {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<Props> = ({ children }) => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <>{children}</> : <Navigate to="/" replace />;
};

export default PrivateRoute;
