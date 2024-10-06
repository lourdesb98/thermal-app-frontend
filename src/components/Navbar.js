import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#123456' }}>
    {/* <AppBar position="static" sx={{ backgroundColor: '#0FEEE2' }}> */}
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          F-ALARMIA
        </Typography>
        <Button color="inherit" component={Link} to="/">Real-Time Data</Button>
        <Button color="inherit" component={Link} to="/reports">Reports</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;  
