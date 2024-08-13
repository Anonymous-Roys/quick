// src/components/auth/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import LoginForm from './LoginForm';
import OtpForm from './OtpForm';
import { useNavigate } from 'react-router-dom';
import { FaSun, FaMoon } from 'react-icons/fa'; // Importing icons

const Login = ({ onLogin }) => {
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true); // State to manage dark mode
  const navigate = useNavigate();

  const handleLogin = async ({ email, password }) => {
    setIsLoading(true);
    try {
      await axios.post('http://localhost:5000/auth/login', { email, password });
      setIsOtpSent(true);
      setEmail(email);
      setError('');
    } catch (error) {
      setError('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpVerify = async ({ otp }) => {
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/auth/verify-otp', { email, otp });
      const data = response.data;

      if (data.token) {
        localStorage.setItem('token', data.token);
        alert('Login successful');
        navigate('/sales'); // Navigate to the protected sales dashboard
      } else {
        alert('Login failed');
      }

      setError('');
    } catch (error) {
      setError('OTP verification failed');
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen ${
        isDarkMode ? 'bg-gray-900' : 'bg-gray-100'
      }`}
    >
      <div className={`w-full max-w-sm p-6 rounded-md shadow-md ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
        <div className="flex justify-end">
          <button onClick={toggleDarkMode} className="focus:outline-none">
            {isDarkMode ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-gray-800" />}
          </button>
        </div>
        <h1 className="mb-4 text-2xl font-bold text-center">Login</h1>
        {isOtpSent ? (
          <OtpForm onSubmit={handleOtpVerify} isLoading={isLoading} error={error} isDarkMode={isDarkMode} />
        ) : (
          <LoginForm onSubmit={handleLogin} isLoading={isLoading} error={error} isDarkMode={isDarkMode} />
        )}
      </div>
    </div>
  );
};

export default Login;
