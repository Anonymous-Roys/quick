import React, { useState } from 'react';
import { Button, IconButton, Typography, Grid, Card, CardContent, FormControl, InputLabel, Select, MenuItem, Checkbox, FormGroup, FormControlLabel } from '@mui/material';
import { TbTrash, TbLayoutList, TbLayoutGrid } from 'react-icons/tb';
import { Scrollbars } from 'react-custom-scrollbars';



const CustomerList = ({ customers, currentPage, setCurrentPage, onViewDetails, onDeleteCustomer }) => {
    const [viewMode, setViewMode] = useState('grid');
    const [visibleFields, setVisibleFields] = useState(['name', 'email', 'phone', 'address']);

    const customersPerPage = 5;
    const indexOfLastCustomer = currentPage * customersPerPage;
    const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
    const currentCustomers = customers.slice(indexOfFirstCustomer, indexOfLastCustomer);

    const handleViewModeChange = (mode) => {
        setViewMode(mode);
    };

    const handleFieldToggle = (field) => {
        setVisibleFields(prev =>
            prev.includes(field)
                ? prev.filter(f => f !== field)
                : [...prev, field]
        );
    };

    const renderCustomerInfo = (customer) => (
        <>
            {visibleFields.includes('name') && <p className='text-[12px] font-semibold'><strong>Name:</strong> {customer.name}</p>}
            {visibleFields.includes('email') && <p className='text-[12px] mt-1'><strong>Email:</strong> {customer.email}</p>}
            {visibleFields.includes('phone') && <p className='text-[12px] mt-1'><strong>Phone:</strong> {customer.phone}</p>}
            {visibleFields.includes('address') && <p className='text-[12px] mt-1'><strong>Address:</strong> {customer.address}</p>}
        </>
    );

    return (
        <div className="mt-4">
            <div className="flex items-center justify-between mb-4">
                <Typography variant="h6">Customers</Typography>
                <div>

                    <IconButton style={{ color: '#3f51b5' }} onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}>
                        {viewMode === "grid" ? <TbLayoutList /> : <TbLayoutGrid />}
                    </IconButton>
                </div>
            </div>

            <FormGroup row className="mb-4 ">
                <FormControlLabel
                    control={<Checkbox checked={visibleFields.includes('name')} onChange={() => handleFieldToggle('name')} />}
                    label="Name"
                />
                <FormControlLabel
                    control={<Checkbox checked={visibleFields.includes('email')} onChange={() => handleFieldToggle('email')} />}
                    label="Email"
                />
                <FormControlLabel
                    control={<Checkbox checked={visibleFields.includes('phone')} onChange={() => handleFieldToggle('phone')} />}
                    label="Phone"
                />
                <FormControlLabel
                    control={<Checkbox checked={visibleFields.includes('address')} onChange={() => handleFieldToggle('address')} />}
                    label="Address"
                />
            </FormGroup>
            <Scrollbars style={{ height: "45vh" }}>
                {currentCustomers.length ? (
                    viewMode === 'grid' ? (
                        <Grid container spacing={2}>
                            {currentCustomers.map((customer) => (
                                <Grid item xs={12} sm={6} md={4} key={customer._id}>
                                    <Card className="bg-[#21222D] shadow-lg" style={{ borderRadius: '8px' }}>
                                        <CardContent style={{ backgroundColor: '#21222D', border: '1px solid #21222D', borderRadius: '8px', color: '#ccc', }}>
                                            {renderCustomerInfo(customer)}

                                            <div className='flex flex-wrap items-end'>
                                                <Button
                                                    variant="contained"
                                                    sx={{
                                                        backgroundColor: '#cccccc0e',
                                                        '&:hover': {
                                                            backgroundColor: '#cccccc00',
                                                        },fontSize:'12px',
                                                    }}
                                                    onClick={() => onViewDetails(customer)}
                                                >
                                                    View Details
                                                </Button>
                                                <IconButton onClick={() => onDeleteCustomer(customer._id)}>
                                                    <TbTrash />
                                                </IconButton>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    ) : (
                        currentCustomers.map((customer) => (
                            <div key={customer._id} className="p-2 mb-2 border rounded bg-[#21222D]">
                                {renderCustomerInfo(customer)}
                                <Button
                                    variant="contained"
                                    sx={{
                                        backgroundColor: '#cccccc0e',
                                        '&:hover': {
                                            backgroundColor: '#cccccc00',
                                        },
                                        
                                    }}
                                    onClick={() => onViewDetails(customer)}
                                >
                                    Report Found Item
                                </Button>
                                <IconButton onClick={() => onDeleteCustomer(customer._id)}>
                                    <TbTrash />
                                </IconButton>
                            </div>
                        ))
                    )
                ) : (
                    <Typography>No customers found.</Typography>
                )}
            </Scrollbars>
            <div className="flex justify-between mt-4">
                <Button
                    variant="contained"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </Button>
                <Button
                    variant="contained"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={indexOfLastCustomer >= customers.length}
                >
                    Next
                </Button>
            </div>
        </div>
    );
};

export default CustomerList;