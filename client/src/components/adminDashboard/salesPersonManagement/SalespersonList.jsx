import React, { useState } from 'react';
import { TbEdit, TbTrash } from 'react-icons/tb';
import SalespersonModal from './SalespersonModel';
import ComponentContainer from '../../ComponentContainer';

const SalespersonList = ({ salespersons, onEdit, onDelete }) => {
  const [selectedSalesperson, setSelectedSalesperson] = useState(null);

  const handleViewProfile = (salesperson) => {
    setSelectedSalesperson(salesperson);
  };
  
  return (
    <ComponentContainer>
      <h3 className="mb-4 text-xl font-bold text-white">Already Reported Items</h3>
      <ul>
        {salespersons.map((sp) => (
          <li
            key={sp._id}
            className="flex flex-col p-4 mb-4 transition-all bg-[#171821] rounded-lg shadow-md md:flex-row md:justify-between hover:bg-gray-700"
            
          >
            <div className="mb-2 text-white md:mb-0 w-[100%]" onClick={() => handleViewProfile(sp)}>
              <span className="block font-semibold">{sp.username}</span>
              <span className="block text-sm text-gray-400">{sp.email}</span>
              <span className="block text-sm text-gray-400">{sp.phone}</span>
              <span className="block text-sm text-gray-400">{sp.address}</span>
            </div>
            <div className="flex items-center mt-2 space-x-2 md:mt-0">
              <button
                onClick={() => onEdit(sp)}
                className="z-10 p-2 text-xl text-yellow-500 transition-all rounded-md hover:text-yellow-400"
              >
                <TbEdit />
              </button>
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to delete this salesperson?')) {
                    onDelete(sp._id);
                  }
                }}
                className="z-10 p-2 text-xl text-red-500 transition-all rounded-md hover:text-red-400"
              >
                <TbTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>
      {selectedSalesperson && (
        <SalespersonModal
          salesperson={selectedSalesperson}
          onClose={() => setSelectedSalesperson(null)}
        />
      )}
    </ComponentContainer>
  );
};

export default SalespersonList;
