// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
// import { FaUser, FaEnvelope, FaLock, FaImage, FaSave, FaEdit } from 'react-icons/fa';
// import 'react-toastify/dist/ReactToastify.css';
// import './AdminEditProfile.css'; // Import the CSS file for animations

// function AdminEditProfile() {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [avatar, setAvatar] = useState('');
//   const [avatarFile, setAvatarFile] = useState(null);
//   const [isNameEditable, setIsNameEditable] = useState(false);
//   const [isEmailEditable, setIsEmailEditable] = useState(false);
//   const [isPasswordEditable, setIsPasswordEditable] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/auth/admin/me', {
//           headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//         });
//         setName(response.data.name);
//         setEmail(response.data.email);
//         setAvatar(response.data.avatar);
//       } catch (error) {
//         toast.error('Failed to fetch profile details');
//       }
//     };
//     fetchProfile();
//   }, []);

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setAvatarFile(file);
//     setAvatar(URL.createObjectURL(file));
//   };

//   const handleUpdateProfile = async () => {
//     const formData = new FormData();
//     formData.append('name', name);
//     formData.append('email', email);
//     if (password) formData.append('password', password);
//     if (avatarFile) formData.append('avatar', avatarFile);

//     try {
//       await axios.put('http://localhost:5000/api/auth/admin/me', formData, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       toast.success('Profile updated successfully!');
//       setTimeout(() => {
//         navigate('/admin');
//       }, 2000);
//     } catch (error) {
//       toast.error('Failed to update profile');
//     }
//   };

//   return (
//     <div className="min-h-screen p-8 bg-gradient-to-b from-blue-50 to-gray-100">
//       <ToastContainer />
//       <h1 className="mb-6 text-3xl font-bold text-center text-blue-700">Edit Profile</h1>
      
//       <div className="mb-6">
//         <label className="block mb-1 text-sm font-medium text-gray-700">Name</label>
//         <div className="flex items-center px-4 py-2 border rounded shadow-lg">
//           <FaUser className="mr-3 text-gray-400" />
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="w-full focus:outline-none"
//             disabled={!isNameEditable}
//           />
//           <FaEdit
//             onClick={() => setIsNameEditable(!isNameEditable)}
//             className="ml-3 text-blue-400 cursor-pointer"
//           />
//         </div>
//       </div>

//       {/* Email Field */}
//       <div className="mb-6">
//         <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
//         <div className="flex items-center px-4 py-2 border rounded shadow-lg">
//           <FaEnvelope className="mr-3 text-gray-400" />
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full focus:outline-none"
//             disabled={!isEmailEditable}
//           />
//           <FaEdit
//             onClick={() => setIsEmailEditable(!isEmailEditable)}
//             className="ml-3 text-blue-400 cursor-pointer"
//           />
//         </div>
//       </div>

//       {/* Password Field */}
//       <div className="mb-6">
//         <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
//         <div className="flex items-center px-4 py-2 border rounded shadow-lg">
//           <FaLock className="mr-3 text-gray-400" />
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full focus:outline-none"
//             disabled={!isPasswordEditable}
//             placeholder="Leave blank to keep current password"
//           />
//           <FaEdit
//             onClick={() => setIsPasswordEditable(!isPasswordEditable)}
//             className="ml-3 text-blue-400 cursor-pointer"
//           />
//         </div>
//       </div>

//       {/* Avatar Field */}
//       <div className="mb-6">
//         <label className="block mb-1 text-sm font-medium text-gray-700">Avatar</label>
//         {avatar && <img src={avatar} alt="Current Avatar" className="w-20 h-20 mb-3 rounded-full shadow-md" />}
//         <div className="flex items-center px-4 py-2 border rounded shadow-lg">
//           <FaImage className="mr-3 text-gray-400" />
//           <input type="file" onChange={handleFileChange} className="w-full focus:outline-none" />
//         </div>
//       </div>

//       {/* Animated Button */}
//       <button
//         onClick={handleUpdateProfile}
//         className="flex items-center justify-center px-6 py-2 mt-4 font-semibold text-white transition-transform transform rounded-lg bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 active:scale-95"
//       >
//         <FaSave className="mr-2" /> Update Profile
//       </button>
//     </div>
//   );
// }

// export default AdminEditProfile;
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { FaUser, FaEnvelope, FaLock, FaImage, FaSave, FaEdit, FaMoon, FaSun } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import './AdminEditProfile.css'; // Import the CSS file for animations

function AdminEditProfile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState('');
  const [avatarFile, setAvatarFile] = useState(null);
  const [isNameEditable, setIsNameEditable] = useState(false);
  const [isEmailEditable, setIsEmailEditable] = useState(false);
  const [isPasswordEditable, setIsPasswordEditable] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false); // State for dark mode
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('https://backendattendance-b2gi.onrender.com/api/auth/admin/me', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setName(response.data.name);
        setEmail(response.data.email);
        setAvatar(response.data.avatar);
      } catch (error) {
        toast.error('Failed to fetch profile details');
      }
    };
    fetchProfile();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAvatarFile(file);
    setAvatar(URL.createObjectURL(file));
  };

  const handleUpdateProfile = async () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    if (password) formData.append('password', password);
    if (avatarFile) formData.append('avatar', avatarFile);

    try {
      await axios.put('https://backendattendance-b2gi.onrender.com/api/auth/admin/me', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Profile updated successfully!');
      setTimeout(() => {
        navigate('/admin');
      }, 2000);
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen p-8 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-b from-blue-50 to-gray-100 text-black'}`}>
      <ToastContainer />
      <h1 className="mb-6 text-3xl font-bold text-center">{isDarkMode ? 'Edit Profile (Dark Mode)' : 'Edit Profile (Light Mode)'}</h1>

      {/* Dark/Light Mode Toggle Button */}
      <button 
        onClick={toggleDarkMode} 
        className="absolute p-2 transition-colors bg-gray-200 rounded-full top-4 right-4 hover:bg-gray-300"
      >
        {isDarkMode ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-blue-800" />}
      </button>

      <div className="mb-6">
        <label className="block mb-1 text-sm font-medium">{isDarkMode ? 'Name' : 'Name'}</label>
        <div className="flex items-center px-4 py-2 border rounded shadow-lg">
          <FaUser className={`mr-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`} />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full focus:outline-none"
            disabled={!isNameEditable}
          />
          <FaEdit
            onClick={() => setIsNameEditable(!isNameEditable)}
            className={`ml-3 cursor-pointer ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}
          />
        </div>
      </div>

      {/* Email Field */}
      <div className="mb-6">
        <label className="block mb-1 text-sm font-medium">{isDarkMode ? 'Email' : 'Email'}</label>
        <div className="flex items-center px-4 py-2 border rounded shadow-lg">
          <FaEnvelope className={`mr-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`} />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full focus:outline-none"
            disabled={!isEmailEditable}
          />
          <FaEdit
            onClick={() => setIsEmailEditable(!isEmailEditable)}
            className={`ml-3 cursor-pointer ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}
          />
        </div>
      </div>

      {/* Password Field */}
      <div className="mb-6">
        <label className="block mb-1 text-sm font-medium">{isDarkMode ? 'Password' : 'Password'}</label>
        <div className="flex items-center px-4 py-2 border rounded shadow-lg">
          <FaLock className={`mr-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`} />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full focus:outline-none"
            disabled={!isPasswordEditable}
            placeholder="Leave blank to keep current password"
          />
          <FaEdit
            onClick={() => setIsPasswordEditable(!isPasswordEditable)}
            className={`ml-3 cursor-pointer ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}
          />
        </div>
      </div>

      {/* Avatar Field */}
      <div className="mb-6">
        <label className="block mb-1 text-sm font-medium">{isDarkMode ? 'Avatar' : 'Avatar'}</label>
        {avatar && <img src={avatar} alt="Current Avatar" className="w-20 h-20 mb-3 rounded-full shadow-md" />}
        <div className="flex items-center px-4 py-2 border rounded shadow-lg">
          <FaImage className={`mr-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`} />
          <input type="file" onChange={handleFileChange} className="w-full focus:outline-none" />
        </div>
      </div>

      {/* Animated Button */}
      <button
        onClick={handleUpdateProfile}
        className="flex items-center justify-center px-6 py-2 mt-4 font-semibold text-white transition-transform transform rounded-lg bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 active:scale-95"
      >
        <FaSave className="mr-2" /> Update Profile
      </button>
    </div>
  );
}

export default AdminEditProfile;
