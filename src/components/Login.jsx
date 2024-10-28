// src/components/Login.js
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Lock, Mail } from 'lucide-react'; // Importing necessary icons from lucide-react
import './Login.css'; // Import the CSS file for animations
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Hook for navigation
  const cardRef = useRef(null); // Reference to the card for mouse movement

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      
      const response = await axios.post('https://backendattendance-b2gi.onrender.com/api/auth/login', {
        email,
        password,
      });

      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem('token', token);
        toast.success('Login successful!'); // Show success toast
        navigate('/attendance'); // Navigate to attendance page
      } else {
        const data = await response.json();
        toast.error(`Login failed: ${data.message || 'An error occurred.'}`); // Show error toast
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed.'); // Show error toast
    } finally {
      setLoading(false);
    }
  };

  const handleMouseMove = (e) => {
    if (cardRef.current) {
      const { left, top, width, height } = cardRef.current.getBoundingClientRect();
      const x = e.clientX - (left + width / 2);
      const y = e.clientY - (top + height / 2);
      const xRot = (y / height) * 10; // Rotate based on vertical mouse position
      const yRot = (x / width) * -10; // Rotate based on horizontal mouse position

      cardRef.current.style.transform = `translateY(10px) rotateX(${xRot}deg) rotateY(${yRot}deg)`; // Apply 3D rotation and translation
    }
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = `translateY(0) rotateX(0deg) rotateY(0deg)`; // Reset transform on mouse leave
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300">
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="login-container">
        <form 
          onSubmit={handleLogin} 
          className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg login-card animate-fade-in"
          ref={cardRef} // Attach the ref to the form
          onMouseMove={handleMouseMove} // Track mouse movement over the card
          onMouseLeave={handleMouseLeave} // Reset on mouse leave
        >
          <h2 className="flex items-center mb-4 text-2xl font-bold text-center text-gray-800">
            <Mail className="mr-2" /> Login
          </h2>
          <div className="flex items-center mb-4 border border-gray-300 rounded">
            <Mail className="w-5 h-5 mx-2 text-gray-500" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 focus:outline-none focus:border-purple-500"
            />
          </div>
          <div className="flex items-center mb-6 border border-gray-300 rounded">
            <Lock className="w-5 h-5 mx-2 text-gray-500" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 focus:outline-none focus:border-purple-500"
            />
          </div>
          <button 
            type="submit" 
            className={`w-full p-2 font-semibold text-white transition duration-300 rounded ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'}`}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <p className="mt-4 text-center text-gray-600">
            Don&apos;t have an account?{' '}
            <span 
              className="text-purple-500 cursor-pointer" 
              onClick={() => navigate('/')} // Adjust navigation as needed
            >
              Register
            </span>
          </p>
          <p className="mt-2 text-center text-gray-600">
            Forgot your password?{' '}
            <span 
              className="text-purple-500 cursor-pointer" 
              onClick={() => navigate('/reset-password-sent')} // Navigate to the reset password sent page
            >
              Reset it here
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
