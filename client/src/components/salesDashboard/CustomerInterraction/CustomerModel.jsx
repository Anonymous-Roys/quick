import React, { useState, useEffect } from 'react';
import { Modal, Box, Button, IconButton, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Scrollbars } from 'react-custom-scrollbars';
import OrderHistory from './OrderHistory';
import NewOrder from './NewOrder';

const CustomerModal = ({ open, onClose, isAddingCustomer, selectedCustomer, onAddCustomer }) => {
    const [newCustomer, setNewCustomer] = useState({ name: '', email: '', phone: '', address: '' });
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        if (!isAddingCustomer && selectedCustomer) {
            setNewCustomer(selectedCustomer);
        } else {
            setNewCustomer({ name: '', email: '', phone: '', address: '' });
        }
    }, [isAddingCustomer, selectedCustomer]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCustomer({ ...newCustomer, [name]: value });
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{
                backgroundColor: '#2B2C37',
                color: '#fff',
                padding: isMobile ? 2 : 4,
                width: isMobile ? '95%' : 600,
                maxWidth: '95%',
                margin: isMobile ? '50px auto' : '100px auto',
                borderRadius: 2,
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                maxHeight: '90vh',
                overflow: 'auto'
            }}>
                <div className="flex items-center justify-between mb-4">
                    <p className='text-[24px] font-bold text-slate-300'>{isAddingCustomer ? 'Add Customer' : 'Customer Details'}</p>
                    <IconButton onClick={onClose} size={isMobile ? "small" : "medium"}>
                        <CloseIcon />
                    </IconButton>
                </div>
                <Scrollbars style={{ height: isMobile ? 'calc(100vh - 200px)' : 350 }}>
                    {isAddingCustomer ? (
                        <div>
                            {['name', 'email', 'phone', 'address'].map((field) => (
                                <TextField
                                    key={field}
                                    label={field.charAt(0).toUpperCase() + field.slice(1)}
                                    name={field}
                                    value={newCustomer[field]}
                                    onChange={handleInputChange}
                                    fullWidth
                                    margin="normal"
                                    sx={{ backgroundColor: '#21222D' }}
                                    required={field === 'name'}
                                />
                            ))}
                            <Button 
                                variant="contained" 
                                color="primary" 
                                onClick={() => onAddCustomer(newCustomer)} 
                                sx={{ marginTop: 2, width: '100%', fontSize:'12px' }}
                            >
                                Add Item
                            </Button>
                        </div>
                    ) : (
                        selectedCustomer && (
                            <div>
                                <p className='text-[16px]'>Item: {selectedCustomer.name}</p>
                                {['email', 'phone', 'address'].map((field) => (
                                    <p key={field} className='text-[16px]'>
                                        {field.charAt(0).toUpperCase() + field.slice(1)}: {selectedCustomer[field]}
                                    </p>
                                ))}
                                <OrderHistory customerId={selectedCustomer._id} />
                                <NewOrder customerId={selectedCustomer._id} />
                            </div>
                        )
                    )}
                </Scrollbars>
            </Box>
        </Modal>
    );
};

export default CustomerModal;