import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import { FaTrashAlt, FaSignOutAlt, FaSun, FaMoon, FaUserEdit } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';

Modal.setAppElement('#root'); // Accessibility setting

function AdminDashboard() {
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState("");
  const [adminAvatar, setAdminAvatar] = useState("");
  const [totalStudents, setTotalStudents] = useState(0);
  const [todayAttendance, setTodayAttendance] = useState(0);
  const [users, setUsers] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };

      const adminRes = await axios.get('https://backendattendance-b2gi.onrender.com/api/auth/admin/me', { headers });
      setAdminName(adminRes.data.name);
      setAdminAvatar(adminRes.data.avatar);

      const studentCount = await axios.get('https://backendattendance-b2gi.onrender.com/api/auth/admin/total-students', { headers });
      setTotalStudents(studentCount.data.total);

      const attendanceToday = await axios.get('https://backendattendance-b2gi.onrender.com/api/auth/admin/today-attendance', { headers });
      setTodayAttendance(attendanceToday.data.presentToday);

      const timing = await axios.get('https://backendattendance-b2gi.onrender.com/api/auth/admin/attendance-timing', { headers });
      setStartTime(timing.data.attendanceStartTime);
      setEndTime(timing.data.attendanceEndTime);

      const userResponse = await axios.get('https://backendattendance-b2gi.onrender.com/api/auth/admin/users', { headers });
      setUsers(userResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const confirmDeleteUser = (userId) => {
    setUserToDelete(userId);
    setModalIsOpen(true);
  };

  const deleteUser = async () => {
    try {
      await axios.delete(`https://backendattendance-b2gi.onrender.com/api/auth/admin/users/${userToDelete}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setModalIsOpen(false);
      setUserToDelete(null);
      toast.success("User deleted successfully!");
      fetchData();
    } catch (error) {
      console.log('error inside admindashboard' , error)
      toast.error("Failed to delete user");
      setModalIsOpen(false);
      setUserToDelete(null);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    toast.info("Logged out successfully!");
    navigate('/admin-login');
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setUserToDelete(null);
  };

  const updateTiming = async () => {
    try {
      await axios.post(
        'https://backendattendance-b2gi.onrender.com/api/auth/admin/set-timing',
        { startTime, endTime },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      toast.success("Attendance timing updated successfully!");
    } catch (error) {
      toast.error("Error updating timing: " + error.message);
    }
  };
  

  return (
    <div className={`min-h-screen p-8 font-sans ${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-gray-100 text-gray-900'}`}>
      <header className="flex flex-wrap items-center justify-between mb-8">
        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-lg"
            onClick={() => setIsDarkMode(!isDarkMode)}
          >
            {isDarkMode ? <FaSun className="text-yellow-300" /> : <FaMoon className="text-blue-600" />}
          </motion.button>
        </div>
        <div className="flex items-center gap-4">
          <img src={adminAvatar} alt="Admin Avatar" className="w-12 h-12 rounded-full" />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate('/admin/edit-profile')}
            className={`flex items-center px-4 py-2 ${isDarkMode ? 'text-gray-900 bg-gray-300' : 'text-white bg-blue-600'} rounded hover:bg-blue-700`}
          >
            <FaUserEdit className="mr-2" /> Edit Profile
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={logout}
            className={`flex items-center px-4 py-2 ${isDarkMode ? 'text-gray-900 bg-gray-300' : 'text-white bg-red-600'} rounded hover:bg-red-700`}
          >
            <FaSignOutAlt className="mr-2" /> Logout
          </motion.button>
        </div>
      </header>

      <section className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className={`p-6 text-center ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-900'} rounded-lg shadow-md`}
        >
          <h3 className="text-xl font-semibold">Total Registered Students</h3>
          <p className={`text-2xl font-bold ${isDarkMode ? 'text-blue-300' : 'text-blue-500'}`}>{totalStudents}</p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className={`p-6 text-center ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-900'} rounded-lg shadow-md`}
        >
          <h3 className="text-xl font-semibold">Today&apos;s Attendance</h3>
          <p className={`text-2xl font-bold ${isDarkMode ? 'text-green-300' : 'text-green-500'}`}>{todayAttendance}</p>
        </motion.div>
      </section>

      <section className={`p-6 mb-8 ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-900'} rounded-lg shadow-md`}>
        <h3 className="mb-4 text-xl font-semibold">Set Attendance Timing</h3>
        <div className="flex flex-wrap gap-4">
          <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className={`flex-1 w-full px-3 py-2 border rounded focus:outline-none ${isDarkMode ? 'bg-gray-700 text-gray-200 border-gray-600' : 'border-gray-300'}`} />
          <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} className={`flex-1 w-full px-3 py-2 border rounded focus:outline-none ${isDarkMode ? 'bg-gray-700 text-gray-200 border-gray-600' : 'border-gray-300'}`} />
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={updateTiming}
          className={`px-6 py-2 mt-4 font-semibold ${isDarkMode ? 'bg-blue-600 text-gray-200' : 'text-white bg-blue-600'} rounded shadow-md hover:bg-blue-700`}
        >
          Update Timing
        </motion.button>
      </section>

      <section className={`p-6 ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-900'} rounded-lg shadow-md overflow-x-auto`}>
        <h3 className="mb-4 text-xl font-semibold">Attendance History</h3>
        <table className="w-full">
          <thead>
            <tr className="text-left border-b">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Attendance</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {users.map((user) => (
                <motion.tr
                  key={user._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={`${user.isPresent ? 'bg-green-100' : 'bg-red-100'} text-gray-900 border-b`}
                >
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">
                    <span className={`px-3 py-1 rounded ${user.isPresent ? 'bg-green-300 text-green-900' : 'bg-red-300 text-red-900'}`}>
                      {user.isPresent ? 'Present' : 'Absent'}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => confirmDeleteUser(user._id)}
                      className="p-2 text-red-600 rounded hover:bg-red-100"
                    >
                      <FaTrashAlt />
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </section>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className={`p-8 bg-white text-gray-900 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-900'}`}
      >
        <h3 className="text-xl font-semibold">Confirm Delete</h3>
        <p>Are you sure you want to delete this user?</p>
        <div className="flex gap-4 mt-4">
          <button onClick={deleteUser} className="px-4 py-2 font-semibold text-white bg-red-600 rounded hover:bg-red-700">Delete</button>
          <button onClick={closeModal} className="px-4 py-2 font-semibold text-gray-700 bg-gray-200 rounded hover:bg-gray-300">Cancel</button>
        </div>
      </Modal>
    </div>
  );
}

export default AdminDashboard;
