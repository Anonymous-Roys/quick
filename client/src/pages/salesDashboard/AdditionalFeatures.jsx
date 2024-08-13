import React from 'react';
import { FaTrophy, FaBook, FaChartLine } from 'react-icons/fa';
import ComponentContainer from '../../components/ComponentContainer';

const AdditionalFeatures = () => {
  return (
    <>
    
    <ComponentContainer>
      <h2 className="pb-2 mb-4 text-2xl font-bold border-b border-gray-700">Additional Features</h2>
      
   

      <div className="mb-6">
        <div className="flex items-center mb-2 font-semibold text-l">
          <FaTrophy className="mr-2 text-yellow-400" />
          <span>Leaderboard</span>
        </div>
        <ul className="pl-6 space-y-1 list-disc list-inside text-[12px]">
          <li>John Doe - 150 sales</li>
          <li>Jane Smith - 120 sales</li>
          <li>Alice Johnson - 100 sales</li>
        </ul>
      </div>

      <div className="mb-6">
        <div className="flex items-center mb-2 font-semibold text-l">
          <FaBook className="mr-2 text-blue-400" />
          <span>Training Materials</span>
        </div>
        <ul className="pl-6 space-y-1 list-disc list-inside text-[12px]">
          <li>Sales Techniques 101</li>
          <li>Customer Service Best Practices</li>
          <li>Product Knowledge Base</li>
        </ul>
      </div>

      <div>
        <div className="flex items-center mb-2 font-semibold text-l">
          <FaChartLine className="mr-2 text-green-400" />
          <span>Reports</span>
        </div>
        <ul className="pl-6 space-y-1 list-disc list-inside text-[12px]">
          <li>Monthly Sales Report</li>
          <li>Quarterly Performance Review</li>
          <li>Annual Sales Summary</li>
        </ul>
      </div>
   
  </ComponentContainer>
  </>
  );
};

export default AdditionalFeatures;
