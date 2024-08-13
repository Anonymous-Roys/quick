import React, { useState } from 'react';
import { Container, List, ListItem, ListItemText, Button, Typography, IconButton, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Snackbar } from '@mui/material';
import { TbTrash } from 'react-icons/tb';
import { Scrollbars } from 'react-custom-scrollbars';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import ComponentContainer from '../../ComponentContainer';

const leadsData = [
    { id: 1, name: 'John Doe', company: 'ABC Corp', status: 'New', email: 'john.doe@example.com', phone: '123-456-7890' },
    { id: 2, name: 'Jane Smith', company: 'XYZ Inc', status: 'Contacted', email: 'jane.smith@example.com', phone: '987-654-3210' },
    { id: 3, name: 'John Doe', company: 'ABC Corp', status: 'New', email: 'john.doe@example.com', phone: '123-456-7890' },
    { id: 4, name: 'Jane Smith', company: 'XYZ Inc', status: 'Contacted', email: 'jane.smith@example.com', phone: '987-654-3210' },
    { id: 5, name: 'John Doe', company: 'ABC Corp', status: 'New', email: 'john.doe@example.com', phone: '123-456-7890' },

];

const LeadsManagement = () => {
    const [leads, setLeads] = useState(leadsData);
    const [selectedLead, setSelectedLead] = useState(null);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [newTask, setNewTask] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const showSnackbar = (message) => {
        setSnackbarMessage(message);
        setSnackbarOpen(true);
    };

    const handleSelectLead = (lead) => {
        setSelectedLead(lead);
        setDialogOpen(true);
    };

    const handleDeleteLead = (id) => {
        if (window.confirm('Are you sure you want to delete this lead?')) {
            setLeads(leads.filter((lead) => lead.id !== id));
            showSnackbar('Lead deleted successfully!');
        }
    };

    const handleAddTask = () => {
        if (selectedLead && newTask) {
            const updatedLeads = leads.map((lead) =>
                lead.id === selectedLead.id ? { ...lead, tasks: [...(lead.tasks || []), newTask] } : lead
            );
            setLeads(updatedLeads);
            setNewTask('');
        }
    };

    return (
        <Container> 
            <p className=" text-[24px] mb-6 font-bold text-slate-300 ml-4">Leads Management</p>
            <ComponentContainer>
                <Scrollbars style={{height: '320px'}}>
                    <List>
                        {leads.map((lead) => (
                            <ListItem 
                                key={lead.id} 
                                button 
                                onClick={() => handleSelectLead(lead)}
                                sx={{ 
                                    borderBottom: '1px solid #e0e0e0', 
                                    padding: '12px 16px',
                                    transition: 'background-color 0.2s',
                                    '&:hover': {
                                        backgroundColor: '#3f51b512',
                                    }
                                }}
                            >
                                <ListItemText 
                                    primary={
                                        <p className='font-bold text-[16px]'>
                                            {lead.name}
                                        </p>
                                    } 
                                    secondary={`${lead.company} - ${lead.status}`} 
                                />
                                <IconButton 
                                    edge="end" 
                                    aria-label="delete" 
                                    onClick={(e) => { 
                                        e.stopPropagation(); 
                                        handleDeleteLead(lead.id); 
                                    }}
                                    sx={{ color: '#f44336', fontSize:'20px' }}
                                >
                                    <TbTrash />
                                </IconButton>
                            </ListItem>
                        ))}
                    </List>
                </Scrollbars>

                <Dialog open={isDialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
                    <DialogTitle sx={{fontSize:'24px', fontWeight:'semibold'}}>Lead Details</DialogTitle>
                    <DialogContent>
                        {selectedLead && (
                            <>
                                <Typography variant="h6" fontWeight="bold" gutterBottom>
                                    {selectedLead.name}
                                </Typography>
                                <Typography gutterBottom>{selectedLead.company}</Typography>
                                <Typography gutterBottom>{selectedLead.email}</Typography>
                                <Typography gutterBottom>{selectedLead.phone}</Typography>
                                <Divider style={{ margin: '20px 0' }} />
                                <Typography variant="h6" fontWeight="bold" gutterBottom>Tasks</Typography>
                                <List sx={{ maxHeight: '15vh', overflow: 'auto' }}>
                                    {(selectedLead.tasks || []).map((task, index) => (
                                        <ListItem key={index}>
                                            <ListItemText primary={task} />
                                        </ListItem>
                                    ))}
                                </List>
                                <TextField
                                    label="New Task"
                                    value={newTask}
                                    onChange={(e) => setNewTask(e.target.value)}
                                    fullWidth
                                    margin="normal"
                                />
                                <Button variant="contained" color="primary" onClick={handleAddTask} sx={{ mt: 2, fontSize:'12px' }}>
                                    Add Task
                                </Button>
                            </>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setDialogOpen(false)} color="primary" sx={{fontSize:'12px'}}>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </ComponentContainer>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                message={snackbarMessage}
            />
        </Container>
    );
};

export default LeadsManagement;
