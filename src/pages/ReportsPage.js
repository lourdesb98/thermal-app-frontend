import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import DataTable from '../components/statistics'

const ReportsPage = () => {
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Historical Reports
      </Typography>
      <DataTable />
    </Box>
  );
};

export default ReportsPage;
