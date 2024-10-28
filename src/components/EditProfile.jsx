import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Edit, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const EditProfile = () => {
  const [user, setUser] = useState({ name: '', email: '', avatar: null });
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('https://backendattendance-b2gi.onrender.com/api/auth/me', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };
    fetchUserData();
  }, []);

  const handleUpdateUser = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', user.name);
    formData.append('email', user.email);
    if (password) formData.append('password', password);
    if (user.avatar) formData.append('avatar', user.avatar);

    try {
      await axios.put('https://backendattendance-b2gi.onrender.com/api/auth/update', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      toast.success('Profile updated successfully!');
      setTimeout(() => navigate('/attendance'), 1000);
    } catch (error) {
      console.error('Error updating user data:', error.message);
      toast.error('Failed to update profile.');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100">
      
      <ToastContainer />

      <motion.div
        className="relative z-10 w-full max-w-lg p-6 bg-white rounded-lg shadow-md animate-fade-in"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h3 className="mb-4 text-2xl font-semibold text-center text-gray-800">Edit Your Profile</h3>

        <form onSubmit={handleUpdateUser}>
          <motion.div
            className="mb-4"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <label className="block mb-1 text-gray-700">Name</label>
            <div className="flex items-center border rounded focus-within:ring focus-within:border-blue-300">
              <Edit className="w-5 h-5 mx-2 text-gray-500" />
              <input
                type="text"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                required
                className="w-full p-2 outline-none"
              />
            </div>
          </motion.div>

          <motion.div
            className="mb-4"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <label className="block mb-1 text-gray-700">Email</label>
            <div className="flex items-center border rounded focus-within:ring focus-within:border-blue-300">
              <Edit className="w-5 h-5 mx-2 text-gray-500" />
              <input
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                required
                className="w-full p-2 outline-none"
              />
            </div>
          </motion.div>

          <motion.div
            className="mb-4"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <label className="block mb-1 text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Leave blank to keep current password"
            />
          </motion.div>

          <motion.div
            className="mb-4"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <label className="block mb-1 text-gray-700">Avatar</label>
            <input
              type="file"
              onChange={(e) => setUser({ ...user, avatar: e.target.files[0] })}
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            />
          </motion.div>

          <motion.button
            type="submit"
            className="flex items-center justify-center w-full px-4 py-2 font-semibold text-white transition duration-300 bg-blue-600 rounded hover:bg-blue-700"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Update Profile
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default EditProfile;
