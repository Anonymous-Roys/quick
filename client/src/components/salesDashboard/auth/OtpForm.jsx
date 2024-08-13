import React, { useState } from 'react';

const OtpForm = ({ onSubmit, isLoading, error, isDarkMode }) => {
  const [otp, setOtp] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ otp });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col items-center p-4 rounded shadow-md ${
        isDarkMode ? 'bg-gray-900' : 'bg-white'
      }`}
    >
      <input
        type="text"
        placeholder="OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className={`w-full p-3 mb-4 border rounded ${
          isDarkMode
            ? 'text-white placeholder-gray-400 bg-gray-800 border-gray-700'
            : 'text-black placeholder-gray-500 bg-gray-100 border-gray-300'
        }`}
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
        {isLoading ? 'Verifying...' : 'Verify OTP'}
      </button>
      {error && <p className={`mt-4 ${isDarkMode ? 'text-red-500' : 'text-red-600'}`}>{error}</p>}
    </form>
  );
};

export default OtpForm;
