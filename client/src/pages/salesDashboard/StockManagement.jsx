import React, { useState, useEffect } from 'react';
import { Container, Typography, Box } from '@mui/material';
import StockReceival from '../../components/salesDashboard/stockManagement.jsx/StockReceival';
import ProductTracker from '../../components/salesDashboard/stockManagement.jsx/ProductTracker';
import LowStockAlert from '../../components/LowStockAlert';
import ComponentContainer from '../../components/ComponentContainer';
import axios from 'axios';


const StockManagement = () => {
    const [products, setProducts] = useState([]);
    const [lowStockItems, setLowStockItems] = useState([]);

    useEffect(() => {
        // Fetch products from API
        // This is a placeholder. Replace with actual API call
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/admin/stock');
                
                // Attach incremental ID to each item
                const itemsWithIds = response.data.map((item, index) => ({
                  ...item,
                  index: index + 1, // Incremental ID starting from 1
                }));
                
                setProducts(itemsWithIds);
              } catch (error) {
                console.error('Error fetching items:', error);
              }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        const lowStock = products.filter(product => product.quantity <= product.threshold);
        setLowStockItems(lowStock);
    }, [products]);

    const handleStockReceival = async (productId, quantity) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/admin/stockQuantity/${productId}`, {
              quantity,
            });
            
            setProducts(prevProducts => 
                prevProducts.map(product => 
                    product._id === productId 
                        ? { ...product, quantity: product.quantity + quantity }
                        : product
                )
            );
            
          } catch (error) {
            console.error('Error updating item:', error);
          }
       
    };

    const handleStockUpdate = (productId, newStock) => {
        setProducts(prevProducts => 
            prevProducts.map(product => 
                product._id === productId 
                    ? { ...product, stock: newStock }
                    : product
            )
        );
    };

    return (
        <div className='md:p-6'>
            <h1 className="mb-12 text-xl font-bold md:text-[32px] text-slate-300 ml-4">Stock Management</h1>
            <ComponentContainer>

                <StockReceival products={products} onStockReceival={handleStockReceival} />
            </ComponentContainer>
            
            <ComponentContainer>
                <ProductTracker products={products} onStockUpdate={handleStockUpdate} />
                </ComponentContainer>
            
            <LowStockAlert lowStockItems={lowStockItems} />
        </div>
    );
};

export default StockManagement;