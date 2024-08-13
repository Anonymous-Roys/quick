import React, { useState } from 'react';

const LoginForm = ({ onSubmit, isLoading, error, isDarkMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col items-center p-4 rounded shadow-md ${
        isDarkMode ? 'bg-gray-900' : 'bg-white'
      }`}
    >
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={`w-full p-3 mb-4 border rounded ${
          isDarkMode
            ? 'text-white placeholder-gray-400 bg-gray-800 border-gray-700'
            : 'text-black placeholder-gray-500 bg-gray-100 border-gray-300'
        }`}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={`w-full p-3 mb-4 border rounded ${
          isDarkMode
            ? 'text-white placeholder-gray-400 bg-gray-800 border-gray-700'
            : 'text-black placeholder-gray-500 bg-gray-100 border-gray-300'
        }`}
        required
      />
      <button
        type="submit"
        className={`w-full p-3 rounded transition-all ${
          isLoading
            ? 'opacity-50 cursor-not-allowed'
            : isDarkMode
            ? 'text-white bg-blue-700 hover:bg-blue-600'
            : 'text-black bg-blue-500 hover:bg-blue-400'
        }`}
        disabled={isLoading}
      >
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
      {error && <p className={`mt-4 ${isDarkMode ? 'text-red-500' : 'text-red-600'}`}>{error}</p>}
    </form>
  );
};

export default LoginForm;
