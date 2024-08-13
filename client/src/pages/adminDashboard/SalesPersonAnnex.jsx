import { useState, useEffect } from 'react';
import axios from 'axios';
import SalespersonForm from '../../components/adminDashboard/salesPersonManagement/SalespersonFormAnnex';
import EditSalespersonForm from '../../components/adminDashboard/salesPersonManagement/EditSalespersonForm';
import SalespersonList from '../../components/adminDashboard/salesPersonManagement/SalespersonList';
import Scrollbars from 'react-custom-scrollbars';


const SalespersonManagement = () => {
  const [salespersons, setSalespersons] = useState([]);
  const [newSalesperson, setNewSalesperson] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    status: 'Available',
    address: '',
    image: null,
  });
  const [editingSalesperson, setEditingSalesperson] = useState(null);

  useEffect(() => {
    const fetchSalespersons = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/salespersons');
        setSalespersons(response.data);
      } catch (error) {
        console.error('Error fetching salespersons:', error);
      }
    };
    fetchSalespersons();
  }, []);

  const handleAddSalesperson = async () => {
    console.log('New Salesperson: ', newSalesperson);
  
    try {
      // Create a FormData object
      const formData = new FormData();
  
      // Append all salesperson data to FormData
      for (const key in newSalesperson) {
        formData.append(key, newSalesperson[key]);
      }
  
      // Send the FormData to the backend
      const response = await axios.post(
        'http://localhost:5000/api/admin/salespersons',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
  
      // Update the salespersons list with the newly added salesperson
      setSalespersons([...salespersons, response.data]);
  
      // Reset the newSalesperson state
      setNewSalesperson({ 
        username: '', 
        email: '', 
        phone: '', 
        password: '', 
        status: 'Available', 
        address: '', 
        image: null, 
      });
    } catch (error) {
      console.error('Error adding salesperson:', error);
    }
  };
  


  const handleEditSalesperson = async () => {
    try {
      const formData = new FormData();
      for (const key in editingSalesperson) {
        formData.append(key, editingSalesperson[key]);
      }

      await axios.put(
        `http://localhost:5000/api/admin/salespersons/${editingSalesperson._id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setSalespersons(
        salespersons.map((sp) => (sp._id === editingSalesperson._id ? editingSalesperson : sp))
      );
      setEditingSalesperson(null);
    } catch (error) {
      console.error('Error editing salesperson:', error);
    }
  };

  const handleDeleteSalesperson = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/salespersons/${id}`);
      setSalespersons(salespersons.filter((sp) => sp._id !== id));
    } catch (error) {
      console.error('Error deleting salesperson:', error);
    }
  };

  return (
    <div className="p-6 text-white bg-[#171821] rounded shadow-md">
      <h2 className="mb-4 text-xl font-bold">Register</h2>

      {/* Add New Salesperson */}
      <SalespersonForm
        salesperson={newSalesperson}
        setSalesperson={setNewSalesperson}
        onSave={handleAddSalesperson}
      />

      {/* Edit Salesperson */}
    

      {/* Salespersons List */}
      <Scrollbars style={{height:'300px'}}>
        
     
        </Scrollbars>
    </div>
  );
};

export default SalespersonManagement;
