// src/components/Login.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/auth/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem('token', token);

        alert('Login successful!');
        navigate('/admin');
      } else {
        alert('Login failed.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login.');
    }
  };

  return (
    <form onSubmit={handleLogin} className="p-4">
      <h2 className="mb-4 text-xl">Login</h2>
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
      <button type="submit" className="w-full p-2 text-white bg-blue-500">Login</button>
      {/* <p className="mt-2">
        Don&apos;t have an account?{' '}
        <span 
          className="text-blue-500 cursor-pointer" 
          onClick={() => navigate('/register')}
        >
          Register
        </span>
      </p> */}
      <p className="mt-2">
        Forgot your password?{' '}
        <span 
          className="text-blue-500 cursor-pointer" 
          onClick={() => navigate('/reset-password-sent')}
        >
          Reset it here
        </span>
      </p>
    </form>
  );
};

export default AdminLogin;
