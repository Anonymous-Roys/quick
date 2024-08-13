import { useState } from 'react';
import Navigation from "../../components/navigation";
import Dashboard from "./Dashboard";
import Profile from "./Profile";
import { Nav_Buttons } from '../../data';
import DevelopmentNotice from '../../components/DevelopmentNotice';
import SalespersonManagement from './SalesPerson';
import StockManagement from '../../components/adminDashboard/StockManagement';
import AirTag from './AirTag';


const AdminDashboard = () => {
  const [selectedComponent, setSelectedComponent] = useState('Dashboard');
  const [editingProduct, setEditingProduct] = useState(null);

 

  const handleSaveProduct = (updatedProduct) => {
    // Update the product in your state or make an API call to save it
    setEditingProduct(null);
    setSelectedComponent('Products');
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setSelectedComponent('Products');
  };

  const renderComponent = () => {
    switch (selectedComponent) {
      case "Dashboard":
        return <Dashboard />;
      case "Profile":
        return <Profile />;

      case "Stocks":
        return <StockManagement  />;
     
      case "Salesperson":
        return <SalespersonManagement />;
      case "Find AirTag":
        return <AirTag />;
      case "Air Tag Registration":
        return <SalespersonManagement />;
      // case "Address":
      // case "Phone":
      //   return <Phone />;
      // case "Favourites":
      //   return <Favourites />;
      // case "Recent":
      //   return <Recent />;
      default:
        return <DevelopmentNotice />;
    }
  };

  return (
    <div className="bg-[#171821] min-h-[100vh] text-white flex">
      <Navigation setSelectedComponent={setSelectedComponent} navItems={Nav_Buttons}/>
      <div className="flex-grow overflow-y-auto">{renderComponent()}</div>
    </div>
  );
};

export default AdminDashboard;
