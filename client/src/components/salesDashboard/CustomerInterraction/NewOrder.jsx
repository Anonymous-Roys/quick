import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { ArrowLeft } from "phosphor-react";
import axios from 'axios';
import { toast } from "react-toastify";

const NewOrder = ({ customerId }) => {
    const [products, setProducts] = useState([]);
    const [selectedParentOption, setSelectedParentOption] = useState(null);
    const [orderSelections, setOrderSelections] = useState([]);
    const [newOrder, setNewOrder] = useState({ copies: '', desc: '' });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching the products:', error);
            toast.error("Failed to fetch products");
        }
    };

    const selectParentOption = (parent) => {
        setSelectedParentOption(parent);
    };

    const selectChildOption = (parent, child) => {
        setOrderSelections([...orderSelections, { parent, type: child.label, price: child.price }]);
        setSelectedParentOption(null);
    };

    const handleOrderInputChange = (e) => {
        const { name, value } = e.target;
        setNewOrder({ ...newOrder, [name]: value });
    };

    const calculateTotalPrice = () => {
        return orderSelections.reduce((total, order) => total + (order.price * (newOrder.copies || 0)), 0);
    };

    const handleAddOrder = () => {
        const order = {
            customer: customerId,
            selections: orderSelections,
            copies: newOrder.copies,
            desc: newOrder.desc,
            status: 'Pending',
            time: new Date().toGMTString()
        };

        axios.post('http://localhost:5000/api/orders', order)
            .then(response => {
                console.log('Order saved:', response.data);
                setOrderSelections([]);
                setNewOrder({ copies: '', desc: '' });
                toast.success("Order added successfully!");
            })
            .catch(error => {
                console.error('Error:', error);
                toast.error("Failed to add order. Please try again.");
            });
    };

    return (
        <div className="mt-4">
            <div className="flex justify-between">
                <h3 className="inline mb-2 text-lg font-bold">Add New Order</h3>
                {selectedParentOption && <button onClick={() => selectParentOption(null)} className="text-2xl"><ArrowLeft /></button>}
            </div>
            {orderSelections.length > 0 && (
                <>
                    <div className="mb-4">
                        <TextField
                            label="Number of Copies"
                            name="copies"
                            value={newOrder.copies}
                            onChange={handleOrderInputChange}
                            fullWidth
                            margin="normal"
                            sx={{ backgroundColor: '#21222D', color:'fff' }}
                            type="number"
                        />
                        <TextField
                            label="Any Other Description"
                            name="desc"
                            value={newOrder.desc}
                            onChange={handleOrderInputChange}
                            fullWidth
                            margin="normal"
                            sx={{ backgroundColor: '#21222D' }}
                        />
                    </div>
                    <Typography variant="h6" sx={{ marginTop: 2 }}>Total Price: GH₵{calculateTotalPrice()}</Typography>
                    <Button variant="contained"  onClick={handleAddOrder} sx={{ marginTop: 2, marginBottom: 4, fontSize:'12px' }}>
                        Add Order
                    </Button>
                </>
            )}
            <div>
                {products.length > 0 ? (
                    <div className="grid w-full grid-cols-2">
                        {!selectedParentOption ? (
                            products.map((option, index) => (
                                <Button
                                    key={index}
                                    variant="contained"
                                    sx={{ marginBottom: 2, marginRight: 2, fontSize:'12px'}}
                                    onClick={() => selectParentOption(option.parent)}
                                >
                                    {option.parent}
                                </Button>
                            ))
                        ) : (
                            products.find(option => option.parent === selectedParentOption).children.map((child, index) => (
                                <Button
                                    key={index}
                                    variant="contained"
                                    sx={{ marginBottom: 2, marginRight: 2 }}
                                    onClick={() => selectChildOption(selectedParentOption, child)}
                                >
                                    {child.label}
                                </Button>
                            ))
                        )}
                    </div>
                ) : (
                    <div>No Items showing</div>
                )}
            </div>
        </div>
    );
};

export default NewOrder;