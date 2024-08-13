import React from 'react';
import { Button } from '@mui/material';

const AddCustomerButton = ({ onClick }) => {
    return (
        <Button
            variant="contained"
            
            onClick={onClick}
            className="mb-4"
            style={{paddingRight:'24px', paddingLeft:'24px', paddingTop:'1px', paddingBottom: '1px', height:'40px', backgroundColor:'#3f51b5', fontSize:'12px'}}
        >
            Add Customer
        </Button>
    );
};

export default AddCustomerButton;