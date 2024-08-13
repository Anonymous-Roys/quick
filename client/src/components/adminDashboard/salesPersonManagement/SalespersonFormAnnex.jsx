import React from 'react';
import ComponentContainer from '../../ComponentContainer';

const SalespersonForm = ({ salesperson, setSalesperson, onSave }) => {
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setSalesperson((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  return (
    <ComponentContainer>
      <h3 className="mb-4 text-2xl font-semibold text-slate-300">Add Airtag</h3>
      <form className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <input
          type="text"
          name="username"
          placeholder="Name"
          value={salesperson.username}
          onChange={handleChange}
          required
          className="w-full p-3 text-sm font-medium bg-[#171821] border border-gray-700 rounded-lg text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          name="email"
          placeholder="Description"
          value={salesperson.email}
          onChange={handleChange}
          required
          className="w-full p-3 text-sm font-medium bg-[#171821] border border-gray-700 rounded-lg text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
    
        <input
          type="password"
          name="password"
          placeholder="....."
          value={salesperson.password}
          onChange={handleChange}
        
          className="w-full p-3 text-sm font-medium bg-[#171821] border border-gray-700 rounded-lg text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
    
        <input
          type="date"
          name="date"
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
            className="flex items-center justify-center w-full px-4 py-3 text-sm font-semibold text-center text-white transition-all bg-[#3f51b5] rounded-lg hover:bg-[#3f51b599] focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Item
          </button>
        </div>
      </form>
    </ComponentContainer>
  );
};

export default SalespersonForm;
