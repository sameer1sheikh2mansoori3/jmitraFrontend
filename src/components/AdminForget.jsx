/* eslint-disable no-unused-vars */
// src/components/ForgotPassword.js
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import './ForgotPassword.css';
import axios from 'axios';

const AdminForgot = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // Loading state to manage request in progress
  const navigate = useNavigate();

  const handleSendEmail = async (e) => {
    e.preventDefault();
    if (loading) return; // Prevent request if loading

    setLoading(true); // Start loading state

    try {
      const response = await axios.post(
        'https://backendattendance-b2gi.onrender.com/api/auth/admin/forgot-password',
        { email: email }
      );

      setMessage('Reset password email sent successfully. Check your inbox!');
      setTimeout(() => {
        alert('Reset password email sent successfully!');
        navigate('/admin-login');
      }, 500);
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    } finally {
      setLoading(false); // End loading state after response
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen forgot-password-container">
      <motion.form
        onSubmit={handleSendEmail}
        className="w-full max-w-md p-6 bg-white border rounded shadow-lg forgot-password-card lg:max-w-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="mb-4 text-xl text-center">Forgot Password</h2>
        <div className="flex items-center mb-4">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuNqr87ErL-7Cbd0YYrbtHZJMkorW6MYVecA&s"
            alt="Email Icon"
            className="w-16 h-16 mr-4"
          />
          <div className="relative w-full">
            <Mail className="absolute text-gray-400 left-3 top-2" />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 pl-10 mb-2 border rounded"
              style={{ maxWidth: '400px' }}
            />
          </div>
        </div>
        <motion.button
          type="submit"
          className="flex items-center justify-center w-full gap-2 p-2 text-white bg-blue-500 breathing-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={loading} // Disable button when loading
        >
          <Mail className="w-4 h-4" />
          {loading ? 'Sending...' : 'Send Me Email'}
        </motion.button>
        {message && <p className="mt-2 text-center text-red-500">{message}</p>}
        
        {/* Links for Login as Admin and Login as User */}
        <div className="mt-4 text-center">
          <Link to="/admin-login" className="text-blue-500 hover:underline">
            Login as Admin
          </Link>
          <span className="mx-2">|</span>
          <Link to="/user-login" className="text-blue-500 hover:underline">
            Login as User
          </Link>
        </div>
      </motion.form>
    </div>
  );
};

export default AdminForgot;
