import React, { useState } from 'react';
import axios from 'axios';

const ChangePasswordForm = ({ salespersonId }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/api/admin/salespersons/${salespersonId}/change-password`,
        { currentPassword, newPassword }
        
      );
      setSuccess('Password changed successfully');
      setError('');
    } catch (error) {
      setError('Error changng password');
      setSuccess('');
    }
  };

  return (
    <form onSubmit={handleChangePassword} className="flex flex-col items-center p-4 bg-gray-900 rounded shadow-md">
      <input
        type="password"
        placeholder="Current Password"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        className="w-full p-3 mb-4 text-white placeholder-gray-400 bg-gray-800 border border-gray-700 rounded"
        required
      />
      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="w-full p-3 mb-4 text-white placeholder-gray-400 bg-gray-800 border border-gray-700 rounded"
        required
      />
      <button
        type="submit"
        className="w-full p-3 text-white transition-all bg-blue-700 rounded hover:bg-blue-600"
      >
        Change Password
      </button>
      {error && <p className="mt-4 text-red-500">{error}</p>}
      {success && <p className="mt-4 text-green-500">{success}</p>}
    </form>
  );
};

export default ChangePasswordForm;
