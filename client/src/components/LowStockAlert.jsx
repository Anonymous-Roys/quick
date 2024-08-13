import React from 'react';
import { Snackbar, Alert } from '@mui/material';

const LowStockAlert = ({ lowStockItems }) => {
    return (
        <Snackbar
            open={lowStockItems.length > 0}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
            <Alert severity="warning">
                Low stock alert for: {lowStockItems.map(item => item.name).join(', ')}
            </Alert>
        </Snackbar>
    );
};

export default LowStockAlert;