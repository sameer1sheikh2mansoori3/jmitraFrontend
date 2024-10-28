/* eslint-disable react/prop-types */
// src/components/ProtectedRoute.js

import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore'; // Adjust the path as necessary

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to='/admin-login' replace />;
  }

  return children;
};

export default ProtectedRoute;
