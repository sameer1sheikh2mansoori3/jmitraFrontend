import { useState,  useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserPlus, User, Lock, Mail, Image } from 'lucide-react'; // Importing necessary icons from lucide-react
import './Register.css'; // Import the CSS file for animations
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const cardRef = useRef(null); // Reference to the card for mouse movement

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('avatar', avatar);

    try {
      const response = await axios.post(
        'https://backendattendance-b2gi.onrender.com/api/auth/register',
        formData, 
       
      );
      console.log(response);

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        toast.success('Registration successful!'); // Show success toast
        navigate('/attendance');
      } else {
        toast.error(`Registration failed: ${data.message || 'An error occurred.'}`); // Show error toast
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Registration failed.'); // Show error toast
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
      <div className="register-container">
        <form 
          onSubmit={handleRegister} 
          className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg register-card animate-fade-in"
          ref={cardRef} // Attach the ref to the form
          onMouseMove={handleMouseMove} // Track mouse movement over the card
          onMouseLeave={handleMouseLeave} // Reset on mouse leave
        >
          <h2 className="flex items-center mb-4 text-2xl font-bold text-center text-gray-800">
            <UserPlus className="mr-2" /> Register
          </h2>
          
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
              onClick={() => navigate('/login')}
            >
              Login
            </span>
          </p>
          <p className="mt-2 text-center text-gray-600">
            Are you an admin?{' '}
            <span 
              className="text-purple-500 cursor-pointer" 
              onClick={() => navigate('/admin-login')}
            >
              Admin Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
