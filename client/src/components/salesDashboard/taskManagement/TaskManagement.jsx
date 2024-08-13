import React, { useState } from 'react';
import { Button, TextField, Typography, IconButton, FormControl, InputLabel, Select, MenuItem, Paper, Grid, Container } from '@mui/material';
import { TbTrash } from 'react-icons/tb';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Scrollbars } from 'react-custom-scrollbars';
import ComponentContainer from '../../ComponentContainer';

const TaskManagements = ({ tasks, setTasks }) => {
    const [newTask, setNewTask] = useState({ title: '', description: '', status: 'pending' });

    const handleAddTask = () => {
        if (newTask.title.trim() === '') {
            toast.error('Task title is required');
            return;
        }

        const task = { ...newTask, id: Date.now().toString() };
        setTasks([task, ...tasks]);
        setNewTask({ title: '', description: '', status: 'pending' });
        toast.success('Task added successfully!');
    };

    const handleDeleteTask = (taskId) => {
        const updatedTasks = tasks.filter(task => task.id !== taskId);
        setTasks(updatedTasks);
        toast.success('Task deleted successfully!');
    };

    const handleStatusChange = (taskId, status) => {
        const updatedTasks = tasks.map(task =>
            task.id === taskId ? { ...task, status } : task
        );
        setTasks(updatedTasks);
        toast.success('Task status updated!');
    };

    return (
        <>
            <h1 className='mb-6 text-[24px] font-bold ml-4 text-slate-300'>Task Management</h1>
            <ComponentContainer>

            
            <Scrollbars style={{height:320}}>
                

            <div className="p-2 mb-4 task-form">
                <TextField
                    label="Task Title"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Task Description"
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    fullWidth
                    margin="normal"
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel>Status</InputLabel>
                    <Select
                        value={newTask.status}
                        onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
                    >
                        <MenuItem value="pending">Pending</MenuItem>
                        <MenuItem value="completed">Completed</MenuItem>
                    </Select>
                </FormControl>
                <Button variant="contained" onClick={handleAddTask} sx={{fontSize:'12px', backgroundColor:'#3f51b5'}}>
                    Add Task
                </Button>
            </div>

            <div className="task-list">
                {tasks.map((task) => (
                    <div key={task.id} className={`relative rounded-md p-3 mb-2 ${task.status === 'completed' ? 'bg-[#171821]' : 'bg-white text-black'}`}>
                        <p className='text-[18px]'>{task.title}</p>
                        <p className=' text-[12px]'>{task.description}</p>
                        <p>Status: {task.status}</p>
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Status</InputLabel>
                            <Select
                                value={task.status}
                                onChange={(e) => handleStatusChange(task.id, e.target.value)}
                            >
                                <MenuItem value="pending">Pending</MenuItem>
                                <MenuItem value="completed">Completed</MenuItem>
                            </Select>
                        </FormControl>
                        <IconButton onClick={() => handleDeleteTask(task.id)} sx={{ color: '#f44336', fontSize:'20px' }}>
                            <TbTrash />
                        </IconButton>
                    </div>
                ))}
            </div>
            </Scrollbars>
            </ComponentContainer>
        </>
    );
};

export default TaskManagements;
