// src/components/Register.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
  
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json(); // Parse the JSON response
   
     
  
      if (response.ok) {
        // Store token in localStorage
        localStorage.setItem('token', data.token);
        
        alert('Registration successful!');
        navigate('/attendance'); // Navigate to attendance page
      } else {
        alert(`Registration failed: ${data.message || 'An error occurred.'}`);
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed.');
    }
  };

  return (
    <form onSubmit={handleRegister} className="p-4">
      <h2 className="mb-4 text-xl">Register</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full p-2 mb-2 border"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full p-2 mb-4 border"
      />
      <button type="submit" className="w-full p-2 text-white bg-blue-500">Register</button>
      <p className="mt-2">
        Already have an account?{' '}
        <span 
          className="text-blue-500 cursor-pointer" 
          onClick={() => navigate('/login')}
        >
          Login
        </span>
      </p>
      <p className="mt-2">
        Are You an admin ?{' '}
        <span 
          className="text-blue-500 cursor-pointer" 
          onClick={() => navigate('/admin-login')}
        >
         AdminLogin
        </span>
      </p>
    </form>
  );
};

export default Register;
