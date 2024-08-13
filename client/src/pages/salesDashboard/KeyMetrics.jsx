
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FaDollarSign, FaBullseye, FaChartLine, FaShoppingCart, FaChartPie } from 'react-icons/fa';
import ComponentContainer from '../../components/ComponentContainer';

const metrics = {
  currencyMetrics: [
    { label: 'Total Sales', value: 5000.00, icon: FaDollarSign, color: 'text-green-400' },
    { label: 'Average Order Value', value: 100.00, icon: FaChartPie, color: 'text-purple-400' }
  ],
  percentageMetrics: [
    { label: 'Sales Targets', value: 80, icon: FaBullseye, color: 'text-yellow-400' },
    { label: 'Conversion Rate', value: 25, icon: FaChartLine, color: 'text-blue-400' }
  ],
  countMetrics: [
    { label: 'Number of Orders', value: 50, icon: FaShoppingCart, color: 'text-red-400' }
  ],
  salesOverview: [
    { month: 'Jan', value: 500 },
    { month: 'Feb', value: 700 },
    { month: 'Mar', value: 800 },
    { month: 'Apr', value: 1000 },
    { month: 'May', value: 1200 },
    { month: 'Jun', value: 1500 },
  ],
};

const KeyMetrics = () => {
  const data = metrics.salesOverview.map((item) => ({
    name: item.month,
    Sales: item.value,
  }));

  const renderMetric = (metric) => (
    <div key={metric.label} className="flex items-center p-4 bg-[#171821] rounded-2xl shadow flex-wrap">
      <metric.icon className={`mr-4 text-[24px] ${metric.color}`} />
      <div>
        <p className="text-[12px]">{metric.label}</p>
        <p className="text-[16px] font-semibold text-white">
          {metric.label.includes('Sales') || metric.label.includes('Value') ? 'GHc ' : ''}
          {metric.value}{metric.label.includes('Rate') || metric.label.includes('Targets') ? '%' : ''}
        </p>
      </div>
    </div>
  );

  return (
    <div className='mt-2 md:p-6'>
      <h2 className="mb-12 ml-5 text-[32px] font-bold text-slate-300">Key Metrics</h2>
      <ComponentContainer>
    <div className="p-3 md:p-6 bg-[#21222D] rounded-2xl shadow-lg text-slate-300">
      <div className="grid gap-4 mb-6 md:grid-cols-2">
        {metrics.currencyMetrics.map(renderMetric)}
        {metrics.percentageMetrics.map(renderMetric)}
        {metrics.countMetrics.map(renderMetric)}
      </div>
      <div className="p-4 bg-[#171821] rounded-2xl shadow">
        <h3 className="mb-2 text-[20px] font-bold text-white">Sales Overview</h3>
        <ResponsiveContainer width="100%" height={300} >
          <LineChart data={data}>
            <CartesianGrid stroke="#444" />
            <XAxis dataKey="name" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip />
            <Line type="monotone" dataKey="Sales" stroke="#3f51b5" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
    </ComponentContainer>
    </div>
  );
};

export default KeyMetrics;