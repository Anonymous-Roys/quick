import React, { useState } from 'react';
import { Typography, TextField, Button, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const ProductTracker = ({ products, onStockUpdate }) => {
    const [stockUpdates, setStockUpdates] = useState({});

    const handleStockChange = (productId, newStock) => {
        setStockUpdates(prev => ({ ...prev, [productId]: newStock }));
    };

    const handleSubmit = (e) => {
        alert('Are you sure you want to update it')
        e.preventDefault();
        Object.entries(stockUpdates).forEach(([productId, newStock]) => {
            onStockUpdate(parseInt(productId), parseInt(newStock));
        });
        setStockUpdates({});
    };

    return (
        <Box sx={{padding:'22px'}}>
            <h1 className="mb-6 font-semibold text-l md:text-[20px] text-white">Daily Product Tracker</h1>
            <form onSubmit={handleSubmit}>
            <div className="bg-[#171821] p-4 rounded-md shadow-md">
        <table className="w-full text-left">
          <thead>
            <tr className=''>
              <th className="text-slate-400">Product Name</th>
              <th className="text-center text-slate-400">Current Stock</th>
              <th className="text-center text-slate-400">Update Stock</th>
            </tr>
          </thead>
          <tbody className='w-full'>
          {products.map((product) => (
                                <tr key={product._id} className='border-t-[1px]  border-slate-500'>
                                    <td scope="row" className='p-6 m-10 text-[16px]'>
                                        {product.name}
                                    </td>
                                    <td className='text-center'>{product.quantity}</td>
                                    <td className='text-center '>
                                        <TextField
                                            type="number"
                                            value={stockUpdates[product._id] || ''}
                                            onChange={(e) => handleStockChange(product._id, e.target.value)}
                                            size="small"
                                            sx={{backgroundColor:'#21222D'}}
                                            disabled
                                            fullWidth
                                        />
                                    </td>
                                </tr>
                            ))}
          </tbody>
        </table>
      </div>
                
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2,  backgroundColor:'#3f51b5' }}>
                    Update Stock
                </Button>
            </form>
        </Box>
    );
};

export default ProductTracker;