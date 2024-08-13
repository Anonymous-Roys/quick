import React, { useState, useCallback } from 'react';
import {
    Container, TextField, Button, Typography, List, ListItem, ListItemText, IconButton, Dialog,
    DialogActions, DialogContent, DialogTitle, Box, Snackbar
} from '@mui/material';
import { TbEdit, TbTrash } from 'react-icons/tb';
import ComponentContainer from '../../ComponentContainer';
import Scrollbars from 'react-custom-scrollbars';

const CRMUpdate = () => {
    const [interactions, setInteractions] = useState([]);
    const [newInteraction, setNewInteraction] = useState({ title: '', content: '' });
    const [selectedInteraction, setSelectedInteraction] = useState(null);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleAddInteraction = useCallback(() => {
        if (newInteraction.title.trim() && newInteraction.content.trim()) {
            const newInteractionId = Date.now().toString();
            setInteractions(prevInteractions => [...prevInteractions, { ...newInteraction, id: newInteractionId }]);
            setNewInteraction({ title: '', content: '' });
            showSnackbar('Interaction added successfully');
        } else {
            showSnackbar('Please fill in both title and content');
        }
    }, [newInteraction]);

    const handleDeleteInteraction = useCallback((id) => {
        setInteractions(prevInteractions => prevInteractions.filter(interaction => interaction.id !== id));
        showSnackbar('Interaction deleted');
    }, []);

    const handleSelectInteraction = useCallback((interaction) => {
        setSelectedInteraction(interaction);
        setDialogOpen(true);
    }, []);

    const handleUpdateInteraction = useCallback(() => {
        if (selectedInteraction) {
            setInteractions(prevInteractions =>
                prevInteractions.map(interaction =>
                    interaction.id === selectedInteraction.id ? selectedInteraction : interaction
                )
            );
            setDialogOpen(false);
            showSnackbar('Interaction updated successfully');
        }
    }, [selectedInteraction]);

    const showSnackbar = (message) => {
        setSnackbarMessage(message);
        setSnackbarOpen(true);
    };

    return (
        <>
           <p className='mb-6 ml-4 mt-6 text-[24px] font-bold text-slate-300'>CRM Updates</p>
           <ComponentContainer>
        <Scrollbars style={{height:'320px'}}>

        
           
            <Box component="form" noValidate autoComplete="off" mb={3}>
                <TextField
                    label="Title"
                    value={newInteraction.title}
                    onChange={(e) => setNewInteraction(prev => ({ ...prev, title: e.target.value }))}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    style={{color:'white'}}
                />
                <TextField
                    label="Content"
                    value={newInteraction.content}
                    onChange={(e) => setNewInteraction(prev => ({ ...prev, content: e.target.value }))}
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                    variant="outlined"
                />
                <Button variant="contained" sx={{ fontSize:'12px', backgroundColor:'#3f51b5' }} onClick={handleAddInteraction} >
                    Add Interaction
                </Button>
            </Box>
            
            <List sx={{borderRadius:'10px', overflow:'hidden', padding:'0'}}>
                {interactions.map((interaction) => (
                    <ListItem key={interaction.id} divider sx={{backgroundColor:'#171821',}}>
                        <ListItemText 
                            primary={interaction.title} 
                            secondary={interaction.content}
                            primaryTypographyProps={{ variant: 'h6' }}
                            secondaryTypographyProps={{ variant: 'body2' }}
                        />
                        <IconButton onClick={() => handleSelectInteraction(interaction)} sx={{ color: '#3f51b5', fontSize:'20px' }}>
                            <TbEdit />
                        </IconButton>
                        <IconButton onClick={() => handleDeleteInteraction(interaction.id)} sx={{ color: '#f44336', fontSize:'20px' }}>
                            <TbTrash />
                        </IconButton>
                    </ListItem>
                ))}
            </List>
            </Scrollbars>
            </ComponentContainer>
            <Dialog open={isDialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
                <DialogTitle sx={{fontSize:'24px', fontWeight:'semibold'}}>Edit Interaction</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Title"
                        value={selectedInteraction?.title || ''}
                        onChange={(e) => setSelectedInteraction(prev => ({ ...prev, title: e.target.value }))}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        label="Content"
                        value={selectedInteraction?.content || ''}
                        onChange={(e) => setSelectedInteraction(prev => ({ ...prev, content: e.target.value }))}
                        fullWidth
                        margin="normal"
                        multiline
                        rows={4}
                        variant="outlined"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)} sx={{ color: '#f44336', fontSize:'12px' }}>
                        Cancel
                    </Button>
                    <Button onClick={handleUpdateInteraction} sx={{ fontSize:'12px', backgroundColor:'#3f51b5' }} variant="contained">
                        Update Interaction
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                message={snackbarMessage}
            />
        </>
    );
};

export default CRMUpdate;