import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Typography } from '@mui/material';
import LowStockAlert from '../LowStockAlert';
import ComponentContainer from '../ComponentContainer';

const StockManagement = () => {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');
  const [threshold, setThreshold] = useState('');
  const [lowStockItems, setLowStockItems] = useState([]);

  useEffect(() => {
    fetchItems();
    const lowStock = items.filter(product => product.quantity <= product.threshold);
    setLowStockItems(lowStock);
  }, [items]);

 

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/stock');
      
      // Attach incremental ID to each item
      const itemsWithIds = response.data.map((item, index) => ({
        ...item,
        index: index + 1, // Incremental ID starting from 1
      }));
      
      setItems(itemsWithIds);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setName(item.name);
    setQuantity(item.quantity);
    setThreshold(item.threshold);
    setDescription(item.description);
  };

  const handleAddOrUpdateItem = async (e) => {
    e.preventDefault();
    
    if (editingItem) {
      // Update existing item
      try {
        const response = await axios.put(`http://localhost:5000/api/admin/stock/${editingItem._id}`, {
          name,
          quantity,
          threshold,
          description,
        });
        setItems(items.map(item => (item._id === editingItem._id ? response.data : item)));
      } catch (error) {
        console.error('Error updating item:', error);
      }
    } else {
      // Add new item
      try {
        const response = await axios.post('http://localhost:5000/api/admin/stock', {
          name,
          quantity,
          threshold,
          description,
        });
        console.log(response.data)
        setItems([...items, { ...response.data, index: items.length + 1 }]);
      } catch (error) {
        console.error('Error adding item:', error);
      }
    }

    resetForm();
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/stock/${id}`);
      setItems(items.filter(item => item._id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const resetForm = () => {
    setEditingItem(null);
    setName('');
    setQuantity('');
    setDescription('');
    setThreshold('');
  };

  return (
    <Box className="p-6">
      <p className="mb-4 text-slate-300 text-[32px] font-bold">Stock Management</p>
      
      <ComponentContainer>
        
        <form onSubmit={handleAddOrUpdateItem} className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Item Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 border rounded bg-[#171821] text-slate-300 font-semibold text-[12px]"
          />
          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="p-2 border rounded bg-[#171821] text-slate-300 font-semibold text-[12px]"
          />
          <input
            type="number"
            placeholder="Threshold"
            value={threshold}
            onChange={(e) => setThreshold(e.target.value)}
            className="p-2 border rounded bg-[#171821] text-slate-300 font-semibold text-[12px]"
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-2 border rounded bg-[#171821] text-slate-300 font-semibold text-[12px]"
          />
          <Button
            type="submit"
           
            sx={{color:"#3f51b5", fontSize:'12px', padding:"8px", width:'fit-content', '&:hover':{color:'#3f51b599'}}}
          >
            {editingItem ? 'Update Item' : 'Add Item'}
          </Button>
          {editingItem && (
            <Button
              onClick={resetForm}
            
              sx={{color:"#f44336", fontSize:'12px', padding:"8px", width:'fit-content', '&:hover':{color:'#f4433699'}}}
            >
              Cancel Edit
            </Button>
          )}
        </form>
        </ComponentContainer>

      <ComponentContainer>
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="font-bold text-slate-500 text-[16px] ">ID</th>
              <th className="font-bold text-slate-500 text-[16px]">Name</th>
              <th className="font-bold text-slate-500 text-[16px]">Quantity</th>
              <th className="font-bold text-slate-500 text-[16px]">Threshold</th>
              <th className="font-bold text-slate-500 text-[16px]">Description</th>
              <th className="font-bold text-slate-500 text-[16px]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id} className="text-white text-[12px] font-semibold">
                <td>{item.index}</td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.threshold}</td>
                <td>{item.description}</td>
                <td>
                  <Button onClick={() => handleEdit(item)}  sx={{color:"#3f51b5", fontSize:'12px', width:'fit-content', '&:hover':{color:'#3f51b599'}}}>Edit</Button>
                  <Button onClick={() => handleDelete(item._id)} sx={{color:"#f44336", fontSize:'12px', width:'fit-content', '&:hover':{color:'#f4433699'}}}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </ComponentContainer>

      <LowStockAlert lowStockItems={lowStockItems} />
    </Box>
  );
};

export default StockManagement;
