// src/components/AdminRegister.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminRegister = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleAdminRegister = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:5000/api/auth/admin/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
  
      if (response.ok) {
        // Store token in localStorage
        localStorage.setItem('token', data.token);

        alert('Admin registration successful!');
        navigate('/admin');
      } else {
        alert(`Registration failed: ${data.message || 'An error occurred.'}`);
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed.');
    }
  };

  return (
    <form onSubmit={handleAdminRegister} className="p-4">
      <h2 className="mb-4 text-xl">Admin Register</h2>
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
    </form>
  );
};

export default AdminRegister;
