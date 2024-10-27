// src/components/Attendance.js
import { useState } from 'react';

const Attendance = () => {
  const [message, setMessage] = useState('');

  const markAttendance = async () => {
    const token = localStorage.getItem('token');
    console.log(token, "This is the token");

    // Check if the user is logged in
    if (!token) {
      setMessage('Error: You are not logged in.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/attendance/mark', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      // Handle the response from the server
      if (response.ok) {
        const data = await response.json(); // Parse response data
        setMessage(data.message || 'Attendance marked successfully!'); // Use server message if available
      } else {
        const errorData = await response.json(); // Parse error response data
        setMessage(errorData.message || 'You are late. Attendance cannot be marked.'); // Use server error message if available
      }
    } catch (error) {
      console.error('❌ Network error:', error);
      setMessage('An error occurred while marking attendance.');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Mark Attendance</h2>
      <button onClick={markAttendance} className="bg-green-500 text-white p-2">
        Mark Attendance
      </button>
      {message && <p className="mt-2">{message}</p>} {/* Display the message */}
    </div>
  );
};

export default Attendance;
