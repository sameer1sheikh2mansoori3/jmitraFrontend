// src/components/RedirectAuthenticatedUser.js

import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore'; // Adjust the path as necessary

// eslint-disable-next-line react/prop-types
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to='/admin' replace />;
  }

  return children;
};

export default RedirectAuthenticatedUser;
