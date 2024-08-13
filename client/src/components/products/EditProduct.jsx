import { useState } from 'react';
import { Button, TextField } from '@mui/material';

const EditProduct = ({ product, onSave, onCancel }) => {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);

  const handleSave = () => {
    onSave({ ...product, name, price });
  };

  return (
    <div className="p-6">
      <h1 className="mb-4 text-3xl font-bold text-slate-100">Edit Product</h1>
      <div className="bg-[#1f2028] p-4 rounded-md shadow-md">
        <div className="mb-4">
          <label className="block text-slate-400">Name:</label>
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            variant="outlined"
            className="bg-[#2a2b32] text-slate-200"
          />
        </div>
        <div className="mb-4">
          <label className="block text-slate-400">Price:</label>
          <TextField
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            fullWidth
            variant="outlined"
            className="bg-[#2a2b32] text-slate-200"
          />
        </div>
        <div className="flex space-x-4">
          <Button onClick={handleSave} className="bg-[#3f51b5] text-white px-4 py-2 rounded-md hover:bg-[#303f9f] transition-colors">Save</Button>
          <Button onClick={onCancel} className="bg-[#ff4444] text-white px-4 py-2 rounded-md hover:bg-[#ff0000] transition-colors">Cancel</Button>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
