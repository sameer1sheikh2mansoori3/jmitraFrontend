// src/components/Login.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    console.log("are bahai login");
    
    if (response.ok) {
      const { token } = await response.json();
      localStorage.setItem('token', token);

      alert('Login successful!');
      navigate('/attendance'); // Navigate to attendance page
    } else {
      alert('Login failed.');
    }
  };

  return (
    <form onSubmit={handleLogin} className="p-4">
      <h2 className="text-xl mb-4">Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="border p-2 mb-2 w-full"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="border p-2 mb-4 w-full"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 w-full">Login</button>
      <p className="mt-2">
        Don&apos;t have an account?{' '}
        <span 
          className="text-blue-500 cursor-pointer" 
          onClick={() => navigate('/register')} // Adjust navigation as needed
        >
          Register
        </span>
      </p>
      <p className="mt-2">
        Forgot your password?{' '}
        <span 
          className="text-blue-500 cursor-pointer" 
          onClick={() => navigate('/reset-password-sent')} // Navigate to the reset password sent page
        >
          Reset it here
        </span>
      </p>
    </form>
  );
};

export default Login;
