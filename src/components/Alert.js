import React, { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';

// API's
import { getLastRealTimeData } from "../api/index.js";

export default function FilledAlerts() {
  const [highestTemperature, setHighestTemperature] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getLastRealTimeData();
        //console.log("result", result[0].highestTemperatureC)
        if (result && result.length > 0) {
          setHighestTemperature(result[0].highestTemperatureC);
        }
      } catch (error) {
        console.error('Error fetching real-time data:', error);
      }
    };

    fetchData(); // Fetch the data initially
    const interval = setInterval(fetchData, 1000); // Fetch data every 5 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    highestTemperature > 50 && (
      <Box sx={{ position: 'fixed', bottom: 16, left: 16, zIndex: 1000 }}>
        <Alert variant="filled" severity="error">
          The highest temperature is over the upper limit of 50°C: {highestTemperature}°C
        </Alert>
      </Box>
    )
  );
}
