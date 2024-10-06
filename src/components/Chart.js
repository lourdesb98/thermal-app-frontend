import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';

const RealTimeChart = () => {
  const [series, setSeries] = useState([{
    data: []
  }]);
  const [lastRecordDate, setLastRecordDate] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from your API
        const response = await axios.get('http://localhost:3030/realTimeData');
        const data = response.data;
        // console.log("DATA: ", data)

       
        // Extract the last 10 values from the data array
        const lastTenData = data.slice(-10);

        // Extract timestamp and highestTemperatureC
        // const chartData = lastTenData.map(item => ({
        const chartData = data.map(item => ({
          // x: new Date(item.timestamp).getTime(),
          x: new Date(item.timestamp),
          y: item.highestTemperatureC,
        }));
        //console.log("chartData", chartData);

        // Set series state
        setSeries([{ data: chartData }]);

        // Extract the date of the last record
        if (lastTenData.length > 0) {
          const lastDate = new Date(lastTenData[lastTenData.length - 1].timestamp).toLocaleString();
          setLastRecordDate(lastDate);
        }
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();

     // Set an interval to update the chart every minute
     const interval = setInterval(fetchData, 60000);


    // Clear the interval when component unmounts
    return () => clearInterval(interval);
  }, []);

  // Extract the date of the last record
 

  const options = {
    chart: {
      id: 'realtime',
      animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: {
          speed: 1000
        }

      }
    },
    title: {
      text: `Highest Temperature -  Date: ${lastRecordDate}`,
      align: 'center',
      style: {
       
        fontSize: '18px',
        fontWeight: '10px',
        // fontWeight: 'bold',
        // color: '#333',
        fontFamily: 'Poppins'
      }
    },

    xaxis: {
      type: 'datetime',
      // range: 15 * 60 * 1000 // 15 minutes in milliseconds
      labels: {
        format: 'dd:MM HH:mm', // Customizes the format for x-axis labels (e.g., '28 Sep 16:27')
      },
      // min: new Date('2024-09-28T00:00:00').getTime(), // Sets a minimum value for the x-axis
      // max: new Date('2024-09-30T23:59:59').getTime(), // Sets a maximum value for the x-axis
    },
    yaxis: {
      title: {
        text: 'Highest Temperature (°C)'
      },
      min: 0, // Set the minimum value for the y-axis
    max: 90, // Set the maximum value for the y-axis
    tickAmount: 8, // Defines how many ticks (divisions) appear on the y-axis
    labels: {
      formatter: function (value) {
        return value.toFixed(1) + '°C'; // Formats the y-axis labels with one decimal place and °C
      },
    },
    }
  };

  return (
    <Chart options={options} series={series} type="line" height={350} />
  );
};

export default RealTimeChart;
