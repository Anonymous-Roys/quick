import React, { useState, useEffect } from 'react';
import { Typography, Button, IconButton } from '@mui/material';
import { TbTrash } from 'react-icons/tb';
import axios from 'axios';
import { toast } from "react-toastify";

const OrderHistory = ({ customerId }) => {
    const [customerOrders, setCustomerOrders] = useState([]);

    useEffect(() => {
        fetchOrdersForCustomer(customerId);
    }, [customerId]);

    const fetchOrdersForCustomer = (customerId) => {
        axios.get(`http://localhost:5000/api/orders/customer/${customerId}`)
            .then(response => {
                setCustomerOrders(response.data);
            })
            .catch(error => {
                console.error('Error fetching orders:', error);
                toast.error("Failed to fetch orders");
            });
    };

    const handleDeleteOrder = async (orderId) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/orders/${orderId}`);
            if (response.status === 200) {
                fetchOrdersForCustomer(customerId);
                toast.success("Order deleted successfully!");
            } else {
                throw new Error('Failed to delete order');
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete order");
        }
    };

    return (
        <div className="mt-4">
            <h3 className="mb-2 text-[20px] font-bold">Order History</h3>
            {customerOrders.map((order) => (
                <div key={order._id} className={`p-2 mb-2 border rounded bg-[#21222D] ${order.status === 'Pending' ? 'bg-slate-500' : ''}`}>
                    <div>
                        <p>Status: {order.status}</p>
                        <p>Time: {order.time}</p>
                        <p>Name: {order.selections.map(selection => selection.parent).join(', ')}</p>
                        <p>Type: {order.selections.map(selection => selection.type).join(', ')}</p>
                        <p>Copies: {order.copies}</p>
                        <p>Total Amount: GH₵{order.selections.reduce((total, selection) => total + (selection.price * order.copies), 0)}</p>
                        <p>Description: {order.desc}</p>
                    </div>
                    <div>
                        <Button
                            variant="contained"
                            disabled={order.status === 'Pending'}
                            sx={{ marginTop: 2, backgroundColor: order.status === 'Pending' ? '#cccccc0e' : '#cccccc00' }}
                        >
                            {order.status === 'Pending' ? 'Mark as Delivered' : 'Mark as Pending'}
                        </Button>
                        <IconButton onClick={() => handleDeleteOrder(order._id)}>
                            <TbTrash />
                        </IconButton>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default OrderHistory;