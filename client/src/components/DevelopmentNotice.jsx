

const DevelopmentNotice = () => {
  return (
    <div className="sticky top-0 left-0 z-50 flex items-center justify-center w-full h-full text-white bg-gray-800 bg-opacity-75">
      <div className="p-4 text-center bg-gray-900 rounded shadow-md">
        <h1 className="text-2xl font-bold">Page Under Development</h1>
        <p className="mt-2">This page is currently under development. Please check back later.</p>
      </div>
    </div>
  );
};

export default DevelopmentNotice;
