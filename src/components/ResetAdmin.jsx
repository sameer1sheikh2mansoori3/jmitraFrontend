/* eslint-disable no-unused-vars */
// src/components/AdminResetPassword.js
import axios from 'axios';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ResetAdmin = () => {
  const { token } = useParams(); // Extract the token from the URL
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate(); // Hook for navigation

  console.log("Extracted Token:", token); // Log the extracted token

  const handleResetPassword = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true); // Set loading to true at the start
    try {
      const response = await axios.post(`https://backendattendance-b2gi.onrender.com/api/auth/admin/admin-password/${token}`, {
        password: newPassword,
      });

      setMessage('Password reset successful! Admin can now log in.');
      setTimeout(() => navigate('/admin-login'), 3000); // Navigate to admin login after 3 seconds
    } catch (error) {
      console.error('Error during admin password reset:', error);
      setMessage('An error occurred. Please try again.'); // Error message for admin
    } finally {
      setLoading(false); // Set loading to false after request completes
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form onSubmit={handleResetPassword} className="w-1/3 p-4 border rounded shadow-lg">
        <h2 className="mb-4 text-xl">Admin Reset Password</h2>
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          className="w-full p-2 mb-2 border"
        />
        <button 
          type="submit" 
          className="w-full p-2 text-white bg-blue-500"
          disabled={loading} // Disable button when loading
        >
          {loading ? 'Resetting Password...' : 'Reset Password'}
        </button>
        {message && <p className="mt-2 text-center">{message}</p>}
      </form>
    </div>
  );
};

export default ResetAdmin;
