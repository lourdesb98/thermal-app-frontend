import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://192.168.40.92:3030',
  baseURL: 'http://localhost:3030',
});

export const getRealTimeData = async () => {
  try {
    const response = await api.get('/realTimeData');
    return response.data;
  } catch (error) {
    console.error('Error fetching real-time data:', error);
    throw error;
  }
};

export const getLastRealTimeData = async () => {
  try {
    const response = await api.get('/LastData');
    return response.data;
  } catch (error) {
    console.error('Error fetching real-time data:', error);
    throw error;
  }
};

export default api;
