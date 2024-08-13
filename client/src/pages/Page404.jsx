import { NavLink } from "react-router-dom";


const Page404 = () => {
  return( 
  <div className="sticky top-0 left-0 z-50 flex items-center justify-center w-full h-full text-white bg-gray-800 bg-opacity-75">
      <div className="p-4 text-center bg-gray-900 rounded shadow-md w-[80%]">
        <h1 className="text-2xl font-bold">Page Not Found</h1>
        <p className="mt-2">This page is not available.</p>
        <NavLink className="mt-2 text-blue-400" to={'/sales'}>Return Home</NavLink>
      </div>
    </div>)
};


export default Page404;