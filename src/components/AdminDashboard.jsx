import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const navigate = useNavigate();
  const [totalStudents, setTotalStudents] = useState(0);
  const [todayAttendance, setTodayAttendance] = useState(0);
  const [attendanceRecords, setAttendanceRecords] = useState([]); // This should have records for attendance, set accordingly
  const [users, setUsers] = useState([]); // State for users
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  // Fetch dashboard data on load
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching total students count
        const studentCount = await axios.get('http://localhost:5000/api/auth/admin/total-students', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setTotalStudents(studentCount.data.total);

        // Fetching today's attendance
        const attendanceToday = await axios.get('http://localhost:5000/api/auth/admin/today-attendance', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setTodayAttendance(attendanceToday.data.presentToday);

        // Fetching attendance timing
        const timing = await axios.get('http://localhost:5000/api/auth/admin/attendance-timing', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (timing.data.attendanceStartTime && timing.data.attendanceEndTime) {
          setStartTime(timing.data.attendanceStartTime);
          setEndTime(timing.data.attendanceEndTime);
        } else {
          console.warn("Timing data format is not as expected:", timing.data);
        }

        // Fetching users
        const userResponse = await axios.get('http://localhost:5000/api/auth/admin/users', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        // Check if userResponse.data is valid and contains users
        if (Array.isArray(userResponse.data)) {
          setUsers(userResponse.data);
        } else {
          console.warn("User data format is not as expected:", userResponse.data);
        }

      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    fetchData();
  }, []);

  // Update timing data for attendance
  const updateTiming = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/admin/set-timing',
        {
          startTime: startTime,
          endTime: endTime
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      alert("Attendance timing updated successfully");
    } catch (error) {
      console.error("Error updating timing:", error);
      if (error?.response?.status === 403) {
        alert('Kindly login again');
        navigate('/admin-login');
      }
      alert("Error updating timing: " + error.message);
    }
  };

  return (
    <div className="min-h-screen p-8 font-sans bg-gray-100">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome, [Admin Name] | Date: {new Date().toLocaleDateString()}</p>
      </header>

      {/* Overview Cards */}
      <section className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2">
        <div className="p-6 text-center bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">Total Registered Students</h3>
          <p className="text-2xl font-bold text-blue-500">{totalStudents}</p>
        </div>
        <div className="p-6 text-center bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">Today's Attendance</h3>
          <p className="text-2xl font-bold text-green-500">{todayAttendance}</p>
        </div>
      </section>

      {/* Attendance Timing Section */}
      <section className="p-6 mb-8 bg-white rounded-lg shadow-md">
        <h3 className="mb-4 text-xl font-semibold">Set Attendance Timing</h3>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block mb-1 text-gray-700">From:</label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="flex-1">
            <label className="block mb-1 text-gray-700">Till:</label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
        </div>
        <button
          onClick={updateTiming}
          className="px-6 py-2 mt-4 font-semibold text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Update Timing
        </button>
      </section>

      {/* Attendance Records Table */}
      {/* <section className="p-6 bg-white rounded-lg shadow-md">
        <h3 className="mb-4 text-xl font-semibold">Attendance Records</h3>
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left border-b">Student Name</th>
              <th className="px-4 py-2 text-left border-b">Date</th>
              <th className="px-4 py-2 text-left border-b">Status</th>
              <th className="px-4 py-2 text-left border-b">View Details</th>
            </tr>
          </thead>
          <tbody>
            {attendanceRecords.length > 0 ? (
              attendanceRecords.map((record, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border-b">{record.studentName}</td>
                  <td className="px-4 py-2 border-b">{record.date}</td>
                  <td className="px-4 py-2 border-b">{record.status}</td>
                  <td className="px-4 py-2 border-b">
                    <button className="text-blue-600 hover:underline">View</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-4 py-2 text-center border-b">No attendance records found</td>
              </tr>
            )}
          </tbody>
        </table>
      </section> */}

      
      {/* Users Table Section */}
<section className="p-6 mt-8 bg-white rounded-lg shadow-md">
  <h3 className="mb-4 text-xl font-semibold">User List</h3>
  <table className="min-w-full border border-gray-300">
    <thead>
      <tr className="bg-gray-200">
        <th className="px-4 py-2 text-left border-b">User ID</th>
        <th className="px-4 py-2 text-left border-b">Email</th>
        <th className="px-4 py-2 text-left border-b">Role</th>
        <th className="px-4 py-2 text-left border-b">Attendance Status</th>
      </tr>
    </thead>
    <tbody>
      {users.length > 0 ? (
        users.map((user, index) => (
          <tr key={index} className={`hover:bg-gray-100 ${user.isPresent ? 'bg-green-100' : 'bg-red-100'}`}>
            <td className="px-4 py-2 border-b">{user._id}</td>
            <td className="px-4 py-2 border-b">{user.email}</td>
            <td className="px-4 py-2 border-b">{user.isAdmin ? "Admin" : "User"}</td>
            <td className="px-4 py-2 border-b">{user.isPresent ? "Present" : "Absent"}</td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="4" className="px-4 py-2 text-center border-b">No users found</td>
        </tr>
      )}
    </tbody>
  </table>
</section>

    </div>
  );
}

export default AdminDashboard;
