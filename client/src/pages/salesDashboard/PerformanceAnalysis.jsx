import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import ComponentContainer from '../../components/ComponentContainer';

const salesData = [
  { month: 'Jan', sales: 500 },
  { month: 'Feb', sales: 700 },
  { month: 'Mar', sales: 800 },
  { month: 'Apr', sales: 1000 },
  { month: 'May', sales: 1200 },
  { month: 'Jun', sales: 1500 },
];

const productSalesData = [
  { name: 'Product A', sales: 2400 },
  { name: 'Product B', sales: 4567 },
  { name: 'Product C', sales: 1398 },
  { name: 'Product D', sales: 9800 },
];

const geographicalSalesData = [
  { name: 'North', value: 400 },
  { name: 'South', value: 300 },
  { name: 'East', value: 300 },
  { name: 'West', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const performanceOverTimeData = [
  { time: 'Week 1', performance: 40 },
  { time: 'Week 2', performance: 30 },
  { time: 'Week 3', performance: 20 },
  { time: 'Week 4', performance: 27 },
  { time: 'Week 5', performance: 18 },
];

const PerformanceAnalysis = () => {
  return (
    <div className="p-1 rounded-lg shadow-lg md:p-6 text-slate-300">
      <h2 className="mb-12 ml-4 text-[32px] font-bold text-slate-300">Performance Analysis</h2>
      <ComponentContainer>
        <div className="mb-6 bg-[#21222D] p-4">
          <h3 className="mb-4 text-[20px] font-semibold text-white">Sales Graph</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid stroke="#444" />
              <XAxis dataKey="month" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#3f51b5" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </ComponentContainer>
      <ComponentContainer>

      
      <div className="p-4 mb-6">
        <h3 className="mb-4 text-[20px] font-semibold text-white">Sales by Product</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={productSalesData}>
            <CartesianGrid stroke="#444" />
            <XAxis dataKey="name" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip />
            <Bar dataKey="sales" fill="#3f51b5" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      </ComponentContainer>

<ComponentContainer>

      <div className="p-4 mb-6">
        <h3 className="mb-4 text-[20px] font-semibold text-white">Geographical Sales Data</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={geographicalSalesData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {geographicalSalesData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      </ComponentContainer>
      <ComponentContainer>

      
      <div className='p-4'>
        <h3 className="mb-4 text-[20px] font-semibold text-white">Performance Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={performanceOverTimeData}>
            <CartesianGrid stroke="#444" />
            <XAxis dataKey="time" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip />
            <Line type="monotone" dataKey="performance" stroke="#82ca9d" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      </ComponentContainer>
    </div>
  );
};

export default PerformanceAnalysis;
