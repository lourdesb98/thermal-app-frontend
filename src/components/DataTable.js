import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// API's
import { getLastRealTimeData } from "../api/index.js";

const DataTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getLastRealTimeData();
        // console.log('Fetched data:', result); // Log the data fetched from the API
        setData(result); // Assuming the response is an array of data points
      } catch (error) {
        console.error('Error fetching real-time data:', error);
      }
    };

    fetchData(); // Fetch the data initially
    const interval = setInterval(fetchData, 5000); // Fetch data every 5 second

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);



  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Data Name</TableCell>
            <TableCell>Data Value</TableCell>
            <TableCell>Timestamp</TableCell>
            {/* <TableCell align="right">Calories</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => {
            // console.log('Rendering row:', row); // Log each row as it's rendered
            // console.log('Rendering row:', row.id);
            // console.log('Rendering row:', row.id);
            // console.log('Rendering row:', row.timestamp);
            // console.log('Rendering row:', row.id);

            return (

              <React.Fragment key={index}>

                <TableRow key={index}>
                  <TableCell>Highest Temperature</TableCell>
                  <TableCell>{row.highestTemperatureC}</TableCell>
                  {/* <TableCell>{new Date(row.timestamp).toLocaleString()}</TableCell> */}
                  <TableCell>{((row.timestamp.replace('-', '/')).replace('T',' ')).split('.')[0]}</TableCell>
                 
                  {/* {console.log(typeof ((row.timestamp)))} */}
                  {/* {console.log(((row.timestamp.replace('-', '/')).replace('T',' ')).split('.')[0])} */}
                </TableRow>

                <TableRow>
                  <TableCell>Average Temperature</TableCell>
                  <TableCell>{row.averageTemperatureC}</TableCell>
                  {/* <TableCell>{new Date(row.timestamp).toLocaleString()}</TableCell> */}
                  <TableCell>{((row.timestamp.replace('-', '/')).replace('T',' ')).split('.')[0]}</TableCell>
                </TableRow>

              </React.Fragment>


            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
