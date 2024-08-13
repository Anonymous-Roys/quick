import { Suspense, useEffect, useState } from "react";
import Navigation from "../../components/navigation";
import Dashboard from "./Dashboard";
import { Sales_Nav_Buttons } from "../../data";
import Profile from "./Profile";
import Orders from "./Orders";
import KeyMetrics from "./KeyMetrics";
import PerformanceAnalysis from "./PerformanceAnalysis";
import CustomerInteraction from "./CustomerInteraction";
import TaskManagement from "./TaskManagement";
import Notifications from "./Notifications";
import AdditionalFeatures from "./AdditionalFeatures";
import DevelopmentNotice from "../../components/DevelopmentNotice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IconButton } from "@mui/material";
import { Close, Menu } from "@mui/icons-material";
import StockManagement from "./StockManagement";
// import jwt from 'jsonwebtoken';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SalesPerson from '../adminDashboard/SalesPerson'
import SalesPersonAnnex from '../adminDashboard/SalesPersonAnnex'
import AirTag from "../adminDashboard/AirTag";


const SalesDashboard = () => {
  const [selectedComponent, setSelectedComponent] = useState("Dashboard");
  const [showNav, setShowNav] = useState(false);
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);



  const decodeToken = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
  
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };
  
  
  useEffect(() => {
    const token = localStorage.getItem('token');
  
    if (token) {
      try {
        const user = decodeToken(token);
        if (!user) {
          localStorage.removeItem('token');
          navigate('/login');
        } else {
          populateSalesDashboard(); // Fetch and display sales data
        }
      } catch (error) {
        console.error('Token decoding error:', error);
        localStorage.removeItem('token');
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);
  
  
  const populateSalesDashboard = async () => {
    try {
      const response = await axios.get('http://localhost:5000/auth/sales', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
  
      if (response.data) {
        setProfileData(response.data);
      } else {
        console.error('Salesperson data not found in response:', response.data);
        // navigate('/login');
      }
  
    } catch (error) {
      console.error('Error fetching sales data:', error);
      navigate('/login'); // Redirect if the request fails (e.g., token expired)
    }
  };
  
  
  
  


    const toggleShowNav = () => {
      setShowNav(prevShowNav => !prevShowNav);
    };

    const renderComponent = () => {
      switch (selectedComponent) {
        case "Dashboard":
          return <Dashboard />;
        case "Profile":
          return <Profile profileData={profileData}/>;
        case "All Items":
          return <Orders />;
        case "Report Missing Item":
          return <SalesPerson />;
          case "Find AirTag":
            return <AirTag />;
          case "Air Tag Registration":
            return <SalesPersonAnnex />;
        // case "Performance Analysis":
        //   return <PerformanceAnalysis />;
        case "Report Found Item":
          return <CustomerInteraction />;
        case "Task Management":
          return <TaskManagement />;
        case "Notifications":
          return <Notifications />;
        case "Stock Management":
          return <StockManagement />;
        case "Additional Features":
          return <AdditionalFeatures />;
       

        default:
          return <DevelopmentNotice />;
      }
    };

    return (
      <div className="bg-[#171821] min-h-[100vh] text-white flex relative">
        <div className="fixed top-[-7px] z-20 p-2 left-10 md:hidden">
          <IconButton onClick={toggleShowNav} className="text-3xl text-white">
            {showNav ? <Close className="text-blue-500" /> : <Menu className="text-blue-500" />}
          </IconButton>
        </div>

        <div className={`flex ${showNav ? 'flex' : 'hidden'} md:block z-10`}>
          <Navigation setSelectedComponent={setSelectedComponent} navItems={Sales_Nav_Buttons} />
        </div>

        <Suspense fallback="loading">
          <div className="flex-grow p-4 overflow-y-auto">{renderComponent()}</div>
          <ToastContainer />
        </Suspense>
      </div>
    );
  };

  export default SalesDashboard;
