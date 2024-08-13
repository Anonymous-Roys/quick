import React, { useState } from 'react';
import { Typography, TextField, Button, Box, MenuItem } from '@mui/material';
import { Padding } from '@mui/icons-material';

const StockReceival = ({ products, onStockReceival }) => {
    const [selectedProduct, setSelectedProduct] = useState('');
    const [quantity, setQuantity] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedProduct && quantity) {
          
            onStockReceival(selectedProduct, parseInt(quantity));
            setSelectedProduct('');
            setQuantity('');
        }
    };

    return (
        <Box sx={{padding:'22px'}}>
            <h1 className="mb-6 font-semibold text-l md:text-[20px] text-white">Receive New Stock</h1>
            <form onSubmit={handleSubmit}>
                <TextField
                    select
                    fullWidth
                    label="Select Product"
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                    margin="normal"
                    sx={{backgroundColor: '#171821'}}
                >
                    {products.map((product) => (
                        <MenuItem key={product._id} value={product._id}>
                            {product.name}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                
                    fullWidth
                    label="Quantity"
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    margin="normal"
                    sx={{backgroundColor: '#171821'}}
                  
                    
                />
                <Button type="submit" variant="contained"  sx={{marginTop:'12px', backgroundColor:'#3f51b5'}}>
                    Receive Stock
                </Button>
            </form>
        </Box>
    );
};

export default StockReceival;