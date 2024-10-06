// DataTable.js
/**
Standard Deviation: Calculates how spread out the temperature readings are 
Hotspots: Identifies temperature readings that exceed a defined threshold (in this case, 75).
Gradients: Calculates the temperature gradients between each reading.
Rolling Average: Calculates a rolling average over a window of 3 readings.
Exponential Moving Average (EMA): Calculates the EMA with an alpha value of 0.2.
Rate of Change: Measures how quickly the temperature readings are changing.
**/

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

// Import temperature calculation functions
import {
    calculateHighestTemperature,
    calculateAverageTemperature,
    calculateLowestTemperature,
    parseTemperatureData,
    calculateStandardDeviation,
    detectHotspots,
    calculateTemperatureGradient,
    calculateRollingAverage,
    calculateEMA,
    calculateRateOfChange,
} from '../functions/statistics.js'; // Adjust the path as necessary

const DataTable = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getLastRealTimeData();
                setData(result);
            } catch (error) {
                console.error('Error fetching real-time data:', error);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Data Name</TableCell>
                        <TableCell>Data Value</TableCell>
                        <TableCell>Timestamp</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, index) => {
                        const temperatures = parseTemperatureData(row.data);
                        const highestTemperature = calculateHighestTemperature(temperatures);
                        const averageTemperature = calculateAverageTemperature(temperatures);
                        const lowestTemperature = calculateLowestTemperature(temperatures);
                        const standardDeviation = calculateStandardDeviation(temperatures, averageTemperature);
                        const hotspots = detectHotspots(temperatures, 75); // Adjust threshold as needed
                        const gradients = calculateTemperatureGradient(temperatures, 1); // Assuming width of 1 unit
                        const rollingAverage = calculateRollingAverage(temperatures, 3); // Window size of 3 for rolling average
                        const ema = calculateEMA(temperatures, 0.2); // Alpha for EMA
                        const rateOfChange = calculateRateOfChange(temperatures);

                        return (
                            <React.Fragment key={index}>
                                <TableRow>
                                    <TableCell>Highest Temperature</TableCell>
                                    <TableCell>{highestTemperature}</TableCell>
                                    <TableCell>{new Date(row.timestamp).toLocaleString()}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Average Temperature</TableCell>
                                    <TableCell>{averageTemperature}</TableCell>
                                    <TableCell>{new Date(row.timestamp).toLocaleString()}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Lowest Temperature</TableCell>
                                    <TableCell>{lowestTemperature}</TableCell>
                                    <TableCell>{new Date(row.timestamp).toLocaleString()}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Standard Deviation</TableCell>
                                    <TableCell>{standardDeviation.toFixed(2)}</TableCell>
                                    <TableCell>{new Date(row.timestamp).toLocaleString()}</TableCell>
                                </TableRow>
                                {/* <TableRow>
                                    <TableCell>Hotspots</TableCell>
                                    <TableCell>{hotspots.length > 0 ? hotspots.join(', ') : 'None'}</TableCell>
                                    <TableCell>{new Date(row.timestamp).toLocaleString()}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Gradients</TableCell>
                                    <TableCell>{gradients.join(', ')}</TableCell>
                                    <TableCell>{new Date(row.timestamp).toLocaleString()}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Rolling Average</TableCell>
                                    <TableCell>{rollingAverage.join(', ')}</TableCell>
                                    <TableCell>{new Date(row.timestamp).toLocaleString()}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Exponential Moving Average</TableCell>
                                    <TableCell>{ema.join(', ')}</TableCell>
                                    <TableCell>{new Date(row.timestamp).toLocaleString()}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Rate of Change</TableCell>
                                    <TableCell>{rateOfChange.join(', ')}</TableCell>
                                    <TableCell>{new Date(row.timestamp).toLocaleString()}</TableCell>
                                </TableRow> */}
                            </React.Fragment>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default DataTable;
















//-------------------------------------------------------------------------------------------------------------------

// import React, { useState, useEffect } from 'react';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';

// // API's
// import { getLastRealTimeData } from "../api/index.js";

// // Import temperature calculation functions
// import {
//     calculateHighestTemperature,
//     calculateAverageTemperature,
//     calculateLowestTemperature,
//     parseTemperatureData
// } from '../functions/statistics.js'; // Adjust the path as necessary

// const DataTable = () => {
//     const [data, setData] = useState([]);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const result = await getLastRealTimeData();
//                 setData(result);
//             } catch (error) {
//                 console.error('Error fetching real-time data:', error);
//             }
//         };

//         fetchData();
//         const interval = setInterval(fetchData, 5000);

//         return () => clearInterval(interval);
//     }, []);

//     return (
//         <TableContainer component={Paper}>
//             <Table>
//                 <TableHead>
//                     <TableRow>
//                         <TableCell>Data Name</TableCell>
//                         <TableCell>Data Value</TableCell>
//                         <TableCell>Timestamp</TableCell>
//                     </TableRow>
//                 </TableHead>
//                 <TableBody>
//                     {data.map((row, index) => {
//                         const temperatures = parseTemperatureData(row.data);
//                         const highestTemperature = calculateHighestTemperature(temperatures);
//                         const averageTemperature = calculateAverageTemperature(temperatures);
//                         const lowestTemperature = calculateLowestTemperature(temperatures);

//                         return (
//                             <React.Fragment key={index}>
//                                 <TableRow>
//                                     <TableCell>Highest Temperature</TableCell>
//                                     <TableCell>{highestTemperature}</TableCell>
//                                     <TableCell>{new Date(row.timestamp).toLocaleString()}</TableCell>
//                                 </TableRow>
//                                 <TableRow>
//                                     <TableCell>Average Temperature</TableCell>
//                                     <TableCell>{averageTemperature}</TableCell>
//                                     <TableCell>{new Date(row.timestamp).toLocaleString()}</TableCell>
//                                 </TableRow>
//                                 <TableRow>
//                                     <TableCell>Lowest Temperature</TableCell>
//                                     <TableCell>{lowestTemperature}</TableCell>
//                                     <TableCell>{new Date(row.timestamp).toLocaleString()}</TableCell>
//                                 </TableRow>
//                             </React.Fragment>
//                         );
//                     })}
//                 </TableBody>
//             </Table>
//         </TableContainer>
//     );
// };

// export default DataTable;
