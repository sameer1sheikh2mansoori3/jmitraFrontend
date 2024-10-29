/* eslint-disable no-unused-vars */
// src/components/AdminLogin.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react'; // Import icons from lucide-react
import axios from 'axios';
import { toast } from 'react-toastify';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'https://backendattendance-b2gi.onrender.com/api/auth/admin/login',
        { email, password },
        
      );
  
      console.log(response , 'this is pure resp'); // For debugging purposes
  
      const { token } = response.data; // Access token directly from the response
  
      // Store the token in local storage
      localStorage.setItem('token', token);
  
      // Show success message
      toast.success('Welcome back!'); // Using toastify for success message
  
      // Redirect to the admin dashboard after a delay
      setTimeout(() => {
        navigate('/admin');
      }, 3000);
  
    }
     catch (error) {
      
      // Handle the error with toastify
      toast.error('An error occurred during login.'); // Display error message
    }
  
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300">
      <form onSubmit={handleLogin} className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg animate-fade-in">
        <h2 className="mb-4 text-2xl font-bold text-center text-gray-800">Admin Login</h2>

        {/* Email Field */}
        <div className="flex items-center mb-4 border border-gray-300 rounded">
          <Mail className="w-5 h-5 mx-2 text-gray-500" /> {/* Email icon */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 focus:outline-none focus:border-purple-500"
          />
        </div>

        {/* Password Field */}
        <div className="flex items-center mb-6 border border-gray-300 rounded">
          <Lock className="w-5 h-5 mx-2 text-gray-500" /> {/* Password icon */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 focus:outline-none focus:border-purple-500"
          />
        </div>

        <button type="submit" className="w-full p-2 font-semibold text-white transition duration-300 bg-purple-600 rounded hover:bg-purple-700">
          Login
        </button>

        <p className="mt-4 text-center text-gray-600">
          Forgot your password?{' '}
          <span 
            className="text-purple-500 cursor-pointer" 
            onClick={() => navigate('/admin-forget')}
          >
            Reset it here
          </span>
        </p>
      </form>
    </div>
  );
};

export default AdminLogin;
