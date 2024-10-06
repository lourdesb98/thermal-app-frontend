import React from 'react';
import MediaBox from '../components/MediaBox';
import DataTable from '../components/DataTable';
import RealTimeChart from '../components/Chart';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import FilledAlerts from '../components/Alert'

const MainPage = () => {
  return (
    <Box sx={{ padding: 2 }}>
     <FilledAlerts /> {/* Alert component */}
    <Typography variant="h4" component="h1" gutterBottom>
      Real-Time Data Dashboard
    </Typography>
    <Box sx={{ paddingBottom: 4 }}>
      <DataTable />
    </Box>
    <Grid container spacing={2}>
      <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'flex-end', height: '400px' }}>
        <MediaBox />
      </Grid>
      <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'flex-end', height: '400px' }}>
      <Box sx={{ width: '100%', height: '100%' }}>
            <RealTimeChart />
          </Box>
      </Grid>
    </Grid>
  </Box>
  );
};

export default MainPage;
