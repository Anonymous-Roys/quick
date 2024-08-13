// SalesPipeline.js
import React from 'react';
import { Typography, LinearProgress, Box } from '@mui/material';

const SalesPipeline = () => {
  const stages = [
    { name: 'Prospecting', value: 30 },
    { name: 'Qualification', value: 50 },
    { name: 'Proposal', value: 70 },
    { name: 'Negotiation', value: 20 },
    { name: 'Closed Won', value: 40 },
  ];

  return (
    <div>
      <Typography variant="h6">Sales Pipeline</Typography>
      {stages.map((stage, index) => (
        <Box key={index} mb={2}>
          <Typography variant="body2">{stage.name}</Typography>
          <LinearProgress variant="determinate" value={stage.value} />
          <Typography variant="caption">{`${stage.value}%`}</Typography>
        </Box>
      ))}
    </div>
  );
};

export default SalesPipeline;