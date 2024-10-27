import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ResetPassword = () => {
  const { token } = useParams(); // Extract the token from the URL
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  console.log("Extracted Token:", token); // Log the extracted token

  const handleResetPassword = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const response = await fetch(`http://localhost:5000/api/auth/reset-password/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: newPassword }),
      });

      if (response.ok) {
        setMessage('Password reset successful! You can now log in.');
        setTimeout(() => navigate('/login'), 3000); // Navigate to login after 3 seconds
      } else {
        const data = await response.json();
        setMessage(data.message || 'Password reset failed.'); // Improved error handling
      }
    } catch (error) {
      console.error('Error during password reset:', error);
      setMessage('An error occurred. Please try again.'); // Error message for user
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form onSubmit={handleResetPassword} className="border p-4 rounded shadow-lg w-1/3">
        <h2 className="text-xl mb-4">Reset Password</h2>
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          className="border p-2 mb-2 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">Reset Password</button>
        {message && <p className="mt-2 text-center">{message}</p>}
      </form>
    </div>
  );
};

export default ResetPassword;
