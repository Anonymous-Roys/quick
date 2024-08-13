
// eslint-disable-next-line react/prop-types
const GraphPlaceholder = ({ title }) => {
  return (
    <div className="p-4 mb-4 bg-[#21222D] text-slate-300 rounded">
      <h3 className="mb-2 text-lg font-bold">{title}</h3>
      <div className="h-32 bg-[#444] rounded"></div>
    </div>
  );
};

export default GraphPlaceholder;
