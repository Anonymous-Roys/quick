// TaskList.js
import React, { useState } from 'react';
import { List, ListItem, ListItemText, Checkbox, Typography, TextField, Button } from '@mui/material';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const toggleTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  return (
    <div>
      <Typography variant="h6">Task List</Typography>
      <TextField
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Enter new task"
      />
      <Button onClick={addTask}>Add Task</Button>
      <List>
        {tasks.map((task, index) => (
          <ListItem key={index}>
            <Checkbox checked={task.completed} onChange={() => toggleTask(index)} />
            <ListItemText primary={task.text} style={{ textDecoration: task.completed ? 'line-through' : 'none' }} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default TaskList;