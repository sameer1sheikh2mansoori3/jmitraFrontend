import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, Image, Mail } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const AdminRegister = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);  // Loading state for button
  const navigate = useNavigate();

  const handleAdminRegister = async (e) => {
    e.preventDefault();
    setLoading(true);  // Set loading to true at start of request
    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    if (avatar) formData.append('avatar', avatar);

    try {
      const response = await axios.post(
        'https://backendattendance-b2gi.onrender.com/api/auth/admin/register',
        formData, // Sending form data directly
        {
          headers: {
            'Content-Type': 'multipart/form-data', // Set this if formData includes files
          },
        }
      );
      console.log(response.data);
      
      const data = await response.json();
  
      if (response.ok) {
        localStorage.setItem('token', data.token);
        toast.success('Admin registration successful!');
        setTimeout(() => {
          navigate('/admin');
        }, 5000);
      } else {
        toast.error(`Registration failed: ${data.message || 'An error occurred.'}`);
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Registration failed.');
    } finally {
      setLoading(false);  // Reset loading state after request completes
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300">
      <ToastContainer position="top-center" autoClose={3000} />
      <form onSubmit={handleAdminRegister} className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg animate-fade-in">
        <h2 className="mb-4 text-2xl font-bold text-center text-gray-800">Admin Register</h2>
        
        {/* Name Field */}
        <div className="flex items-center mb-4 border border-gray-300 rounded">
          <User className="w-5 h-5 mx-2 text-gray-500" />
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-2 focus:outline-none focus:border-purple-500"
          />
        </div>

        {/* Email Field */}
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

        {/* Password Field */}
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

        {/* Avatar Upload Field */}
        <div className="flex items-center mb-6 border border-gray-300 rounded">
          <Image className="w-5 h-5 mx-2 text-gray-500" />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setAvatar(e.target.files[0])}
            required
            className="w-full p-2 focus:outline-none focus:border-purple-500"
          />
        </div>

        <button 
          type="submit" 
          className={`w-full p-2 font-semibold text-white transition duration-300 rounded ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'}`}
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
        
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{' '}
          <span 
            className="text-purple-500 cursor-pointer" 
            onClick={() => navigate('/admin-login')}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default AdminRegister;
