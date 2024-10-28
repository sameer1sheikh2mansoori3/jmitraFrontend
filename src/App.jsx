// src/App.js

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Attendance from './components/Attendance';
import ResetPassword from './components/ResetPassword';
import ResetPasswordSent from './components/ForgotPassword';
import ForgotPassword from './components/ForgotPassword';
import AdminDashboard from './components/AdminDashboard';
import AdminRegister from './components/AdminRegister';
import AdminLogin from './components/AdminLogin';
import EditProfile from './components/EditProfile';
import AdminEditProfile from './components/AdminEditProfile';
// Import the ProtectedRoute component
import RedirectAuthenticatedUser from './components/RedirectAuthenticatedUser'; // Import the RedirectAuthenticatedUser component
import { useAuthStore } from './store/authStore'; // Assuming you have a global state for auth

import ResetAdmin from './components/ResetAdmin';
import AdminForgot from './components/AdminForget';

function App() {
  const {loading } = useAuthStore(); // Access authentication state

  if (loading) return <div>Loading...</div>; // Show a loading state while checking auth

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route
          path="/login"
          element={
            <RedirectAuthenticatedUser>
              <Login />
            </RedirectAuthenticatedUser>
          }
        />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/reset-password-sent" element={<ResetPasswordSent />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        <Route
          path="/admin-login"
          element={
            <RedirectAuthenticatedUser>
              <AdminLogin />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/admin-register"
          element={
            <RedirectAuthenticatedUser>
              <AdminRegister />
            </RedirectAuthenticatedUser>
          }
        />
         <Route
          path="/admin-forget"
          element={
            
            <AdminForgot />
           
          }
        />
        <Route
          path="admin-reset/reset-password/:token"
          element={
           
              <ResetAdmin/>
           
          }
        />

<Route
          path="/admin"
          element={
           
              <AdminDashboard />
           
          }
        />
        <Route
          path="/admin/edit-profile"
          element={
            // <ProtectedRoute>
              <AdminEditProfile />
            // </ProtectedRoute>
          }
        />
        
        {/* Redirect any undefined routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
