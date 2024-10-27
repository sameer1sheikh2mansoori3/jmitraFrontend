// src/components/ForgotPassword.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  const handleSendEmail = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const response = await fetch('http://localhost:5000/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage('Reset password email sent successfully. Check your inbox!');
        // Show a popup after a successful email send
        setTimeout(() => {
          alert('Reset password email sent successfully!'); // Popup message
          navigate('/login'); // Redirect to login after popup is acknowledged
        }, 500); // Wait for 0.5 seconds before showing the alert
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || 'Failed to send email. Please try again.');
      }
    } catch (error) {
      console.error('❌ Error sending email:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form onSubmit={handleSendEmail} className="border p-4 rounded shadow-lg w-full max-w-md lg:max-w-lg"> {/* Updated width settings */}
        <h2 className="text-xl mb-4">Forgot Password</h2>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border p-2 mb-2 w-full" // Keep the width full
          style={{ maxWidth: '400px' }} // Maximum width for better visibility
        />
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">Send Me Email</button>
        {message && <p className="mt-2 text-center">{message}</p>}
      </form>
    </div>
  );
};

export default ForgotPassword;
