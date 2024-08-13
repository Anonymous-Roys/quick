import React from 'react';
import { FaSave, FaTimes } from 'react-icons/fa';
import ComponentContainer from '../../ComponentContainer';

const EditSalespersonForm = ({ salesperson, setSalesperson, onSave, onCancel }) => {
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setSalesperson((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  return (
    <ComponentContainer>
      <h3 className="mb-4 text-2xl font-semibold text-slate-300">Edit Item</h3>
      <form className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={salesperson.username}
          onChange={handleChange}
          className="w-full p-3 text-sm font-medium bg-[#171821] border border-gray-700 rounded-lg text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={salesperson.email}
          onChange={handleChange}
          className="w-full p-3 text-sm font-medium bg-[#171821] border border-gray-700 rounded-lg text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          name="phone"
          placeholder="Phone"
          value={salesperson.phone}
          onChange={handleChange}
          className="w-full p-3 text-sm font-medium bg-[#171821] border border-gray-700 rounded-lg text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={salesperson.address}
          onChange={handleChange}
          className="w-full p-3 text-sm font-medium bg-[#171821] border border-gray-700 rounded-lg text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="file"
          name="image"
          onChange={handleChange}
          className="w-full p-3 text-sm font-medium bg-[#171821] border border-gray-700 rounded-lg text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex space-x-2 md:col-span-2">
          <button
            onClick={onSave}
            className="flex items-center justify-center w-full px-4 py-3 text-sm font-semibold text-center text-white transition-all bg-[#3f51b5] rounded-lg hover:bg-[#3f51b599] focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <FaSave className="mr-2" /> Save Changes
          </button>
          <button
            onClick={onCancel}
            className="flex items-center justify-center w-full px-4 py-3 text-sm font-semibold text-center text-white transition-all bg-[#f44336] rounded-lg hover:bg-[#f4433699] focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <FaTimes className="mr-2" /> Cancel
          </button>
        </div>
      </form>
    </ComponentContainer>
  );
};

export default EditSalespersonForm;
