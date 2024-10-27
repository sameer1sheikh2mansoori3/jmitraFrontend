// src/App.js

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Attendance from './components/Attendance';
import ResetPassword from './components/ResetPassword';
import ResetPasswordSent from './components/ForgotPassword';
import ForgotPassword from './components/ForgotPassword';
import AdminDashboard from './components/AdminDashboard';
import AdminRegister from './components/AdminRegister';
import AdminLogin from './components/AdminLogin';

function App() {
  return (
    <Router>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="mb-6 text-3xl">Attendance App</h1>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/reset-password-sent" element={<ResetPasswordSent />} />
          <Route path="/forgot-password" element={<ForgotPassword />} /> 
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-register" element={<AdminRegister />} />
          <Route path="/admin" element={<AdminDashboard />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
