import  { useState } from 'react';
import { Container, Grid, IconButton } from '@mui/material';
import TaskManagements from '../../components/salesDashboard/taskManagement/TaskManagement';
import LeadsManagement from '../../components/salesDashboard/taskManagement/LeadsManagement';
import SalesPresentations from '../../components/salesDashboard/taskManagement/SalesPresentations';
import CRMUpdates from '../../components/salesDashboard/taskManagement/CRMUpdates';
import CalendarComponent from '../../components/salesDashboard/taskManagement/CalenderComponent';
import { CalendarMonth, CalendarViewDay } from '@mui/icons-material';

const TaskManagement = () => {
    const [tasks, setTasks] = useState([]);
    const [leads, setLeads] = useState([]);
    const [presentations, setPresentations] = useState([]);
    const [interactions, setInteractions] = useState([]);
    const [openCalender, setOpenCalender] = useState(false);
    
    
    const handleOpenCalender =() => {
        setOpenCalender(prevToggle => !prevToggle)
    }

    return (
        <Container className="relative py-4 sales-dashboard">
            <IconButton onClick={handleOpenCalender} sx={{color:'#3f51b5'}}>
            <CalendarMonth />
            </IconButton>
            {openCalender && <CalendarComponent/>}
            <Grid container spacing={1}>
                <Grid item xs={12} md={6}>
                    <LeadsManagement leads={leads} setLeads={setLeads} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TaskManagements tasks={tasks} setTasks={setTasks} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <SalesPresentations presentations={presentations} setPresentations={setPresentations} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <CRMUpdates interactions={interactions} setInteractions={setInteractions} />
                </Grid>
               
            </Grid>
        </Container>
    );
};

export default TaskManagement;
