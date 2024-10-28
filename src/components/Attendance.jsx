import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Edit, CheckCircle, LogOut } from 'lucide-react';
import Confetti from 'react-confetti';
import { motion } from 'framer-motion'; // Import Framer Motion


import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Attendance = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [attendanceMessage, setAttendanceMessage] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const navigate = useNavigate();

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

  const markAttendance = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setAttendanceMessage('Error: You are not logged in.');
      return;
    }
    try {
      const response = await axios.post(
        'https://backendattendance-b2gi.onrender.com/api/attendance/mark',
        {}, // No data in the body for this request
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data); 

      if (response.ok) {
        const data = await response.json();
        setAttendanceMessage(data.message || 'Attendance marked successfully!');
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      } else {
        const errorData = await response.json();
        setAttendanceMessage(errorData.message || 'You are late. Attendance cannot be marked.');
      }
    } catch (error) {
      console.error('❌ Network error:', error);
      setAttendanceMessage('An error occurred while marking attendance.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // const chartData = {
  //   labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  //   datasets: [
  //     {
  //       label: 'Attendance This Week',
  //       data: [1, 1, 0, 1, 1], // Example attendance data
  //       fill: false,
  //       backgroundColor: 'rgba(99, 102, 241, 0.6)',
  //       borderColor: 'rgba(99, 102, 241, 0.8)',
  //     },
  //   ],
  // };

  // const chartOptions = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       display: true,
  //     },
  //   },
  // };

  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;

  return (
    <div className="relative min-h-screen p-8 bg-gray-100">
      {showConfetti && <Confetti />}
      
      {/* 3D Background */}
      {/* <Canvas className="absolute inset-0 z-0 opacity-50">
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Sphere visible args={[1, 100, 200]} scale={2}>
          <MeshWobbleMaterial color="#6366F1" factor={1} speed={2} />
        </Sphere>
      </Canvas> */}

      <motion.div
        className="relative z-10 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <header className="flex items-center p-6 mb-8 bg-white rounded-lg shadow-md">
          <img
            src={user.avatar}
            alt="Profile"
            className="w-12 h-12 mr-4 rounded-full"
          />
          <div>
            <h1 className="text-3xl font-bold text-gray-800">User Dashboard</h1>
            <p className="text-gray-600">Welcome, {user.name} | Date: {new Date().toLocaleDateString()}</p>
            <button
              onClick={() => navigate('/edit-profile')}
              className="flex items-center px-4 py-2 mt-4 text-white transition duration-200 transform bg-blue-600 rounded hover:bg-blue-700 hover:scale-105"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 mt-4 ml-4 text-white transition duration-200 transform bg-red-600 rounded hover:bg-red-700 hover:scale-105"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </header>

        <motion.section
          className="p-6 bg-white rounded-lg shadow-md"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <h2 className="mb-4 text-xl font-semibold text-gray-800">Mark Attendance</h2>
          <button
            onClick={markAttendance}
            className="flex items-center p-2 text-white transition duration-200 transform bg-green-500 rounded hover:bg-green-600 hover:scale-105"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Mark Attendance
          </button>
          {attendanceMessage && (
            <p className={`mt-2 ${attendanceMessage.includes('Error') ? 'text-red-500' : 'text-green-600'}`}>
              {attendanceMessage}
            </p>
          )}
        </motion.section>

        {/* Attendance Chart */}
        {/* <motion.section
          className="p-6 mt-8 bg-white rounded-lg shadow-md"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <h2 className="mb-4 text-xl font-semibold text-gray-800">Attendance Overview</h2>
          <Line data={chartData} options={chartOptions} />
        </motion.section> */}
      </motion.div>
    </div>
  );
};

export default Attendance;
