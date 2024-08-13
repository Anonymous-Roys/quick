import React, { useState } from 'react';
import {
    Container, List, ListItem, ListItemText, Button, Typography, IconButton, TextField,
    Dialog, DialogActions, DialogContent, DialogTitle
} from '@mui/material';
import { TbTrash, TbEye, TbDownload, TbShare, TbEdit } from 'react-icons/tb';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { saveAs } from 'file-saver';
import ComponentContainer from '../../ComponentContainer';
import Scrollbars from 'react-custom-scrollbars';


const SalesPresentation = () => {
    const [presentations, setPresentations] = useState([
        { id: 1, title: 'Presentation 1', content: 'This is the content of Presentation 1.' },
        { id: 2, title: 'Presentation 2', content: 'This is the content of Presentation 2.' },
    ]);
    const [selectedPresentation, setSelectedPresentation] = useState(null);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [newPresentation, setNewPresentation] = useState({ title: '', content: '' });
    const [isPreviewOpen, setPreviewOpen] = useState(false);

    const handleSelectPresentation = (presentation) => {
        setSelectedPresentation(presentation);
        setDialogOpen(true);
    };

    const handleDeletePresentation = (id) => {
        setPresentations(presentations.filter((presentation) => presentation.id !== id));
    };

    const handleAddPresentation = () => {
        if (newPresentation.title && newPresentation.content) {
            const newPresentationId = Date.now().toString();
            const updatedPresentations = [...presentations, { ...newPresentation, id: newPresentationId }];
            setPresentations(updatedPresentations);
            setNewPresentation({ title: '', content: '' });
            setDialogOpen(false);
        }
    };

    const handleUpdatePresentation = () => {
        if (selectedPresentation) {
            const updatedPresentations = presentations.map((presentation) =>
                presentation.id === selectedPresentation.id ? selectedPresentation : presentation
            );
            setPresentations(updatedPresentations);
            setDialogOpen(false);
        }
    };

    const handleExportPresentation = (presentation) => {
        const blob = new Blob([presentation.content], { type: 'text/plain;charset=utf-8' });
        saveAs(blob, `${presentation.title}.txt`);
    };

    const handleSharePresentation = (presentation) => {
        const shareableLink = `${window.location.origin}/presentation/${presentation.id}`;
        navigator.clipboard.writeText(shareableLink);
        alert(`Link copied to clipboard: ${shareableLink}`);
    };

    const handlePreviewPresentation = (presentation) => {
        setSelectedPresentation(presentation);
        setPreviewOpen(true);
    };

    return (
        <>
            <p className='mb-6 ml-4 text-[24px] font-bold text-slate-300 mt-6'>Sales Presentations</p>
            <ComponentContainer style={{padding:'20px'}}>
            <Scrollbars style={{height:'320px'}}>
            <Button variant="contained" color="primary" onClick={() => setDialogOpen(true)} sx={{marginBottom:'12px', fontSize:'12px', backgroundColor:'#3f51b5'}}>
                Add New Presentation
            </Button>
            <List>
                {presentations.map((presentation) => (
                    <ListItem key={presentation.id} button>
                        <ListItemText primary={presentation.title} style={{fontWeight:700, fontSize:'12px'}}/>
                        <IconButton onClick={() => handlePreviewPresentation(presentation)} sx={{ color: '#0f0', fontSize:'20px' }}>
                            <TbEye />
                        </IconButton >
                        <IconButton onClick={() => handleExportPresentation(presentation)} sx={{ color: '#fff', fontSize:'20px' }}>
                            <TbDownload />
                        </IconButton>
                        <IconButton onClick={() => handleSharePresentation(presentation)} sx={{ color: '#3f51b5', fontSize:'20px' }}>
                            <TbShare />
                        </IconButton>
                        <IconButton onClick={() => handleDeletePresentation(presentation.id)} sx={{ color: '#f44336', fontSize:'20px' }}>
                            <TbTrash />
                        </IconButton>
                        <IconButton onClick={() => handleSelectPresentation(presentation)} sx={{ fontSize:'20px', color:'#3f51b5' }}>
                        <TbEdit />
                        </IconButton>
                    </ListItem>
                ))}
            </List>
            </Scrollbars>
            </ComponentContainer>
            <Dialog open={isDialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
                <DialogTitle sx={{fontSize:'24px', fontWeight:'semibold'}}>{selectedPresentation ? 'Edit Presentation' : 'Add New Presentation'}</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Title"
                        value={selectedPresentation ? selectedPresentation.title : newPresentation.title}
                        onChange={(e) =>
                            selectedPresentation
                                ? setSelectedPresentation({ ...selectedPresentation, title: e.target.value })
                                : setNewPresentation({ ...newPresentation, title: e.target.value })
                        }
                        fullWidth
                        margin="normal"
                    />
                    <ReactQuill
                        value={selectedPresentation ? selectedPresentation.content : newPresentation.content}
                        onChange={(content) =>
                            selectedPresentation
                                ? setSelectedPresentation({ ...selectedPresentation, content })
                                : setNewPresentation({ ...newPresentation, content })
                        }
                        theme="snow"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)}  sx={{ fontSize:'12px', color:'#f44336'}}>
                        Cancel
                    </Button>
                    <Button
                        onClick={selectedPresentation ? handleUpdatePresentation : handleAddPresentation}
                        sx={{ fontSize:'12px', backgroundColor:'#3f51b5' }}
                        variant="contained"
                    >
                        {selectedPresentation ? 'Update Presentation' : 'Add Presentation'}
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={isPreviewOpen} onClose={() => setPreviewOpen(false)} maxWidth="md" fullWidth>
                <DialogTitle>{selectedPresentation ? selectedPresentation.title : 'Preview Presentation'}</DialogTitle>
                <DialogContent>
                    <Typography>{selectedPresentation ? selectedPresentation.content : ''}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setPreviewOpen(false)} sx={{ fontSize:'12px', color:'#f44336' }}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default SalesPresentation;
