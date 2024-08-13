import React from 'react';
import { FaTimes } from 'react-icons/fa';

const SalespersonModal = ({ salesperson, onClose }) => {
  if (!salesperson) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md p-6 bg-gray-800 rounded shadow-lg">
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-bold">{salesperson.username}'s Profile</h2>
          <button onClick={onClose} className="text-red-600 hover:text-red-500">
            <FaTimes />
          </button>
        </div>
        <div className="space-y-4">
          <p><strong>Email:</strong> {salesperson.email}</p>
          <p><strong>Phone:</strong> {salesperson.phone}</p>
          <p><strong>Address:</strong> {salesperson.address}</p>
          <img src={salesperson.image} alt={salesperson.username} className="object-cover w-full h-40 rounded" />
        </div>
        <button
          onClick={onClose}
          className="w-full px-4 py-2 mt-4 text-center bg-blue-600 rounded hover:bg-blue-500"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SalespersonModal;
